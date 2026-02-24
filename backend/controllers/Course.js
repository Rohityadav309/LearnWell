import Course from "../models/Course.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import { convertSecondsToDuration } from "../utils/secToDuration.js";
import CourseProgress from "../models/CourseProgress.js";
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";

export const createCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status = "Draft",
      instructions,
    } = req.body;

    const thumbnail = req.files?.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    // Check if the user is an instructor
    const instructorDetails = await User.findOne({
      _id: userId,
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    // Validate category existence
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    // Upload the thumbnail image to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);

    // Create a new course document
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status,
      instructions,
    });

    // Update instructor with new course
    await User.findByIdAndUpdate(
      instructorDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // Update category with new course
    await Category.findByIdAndUpdate(
      category,
      { $push: { course: newCourse._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

//get all courses

export const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnroled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      success: false,
      message: "Can't Fetch Course Data",
      error: error.message,
    });
  }
};

//getCourseDetails
export const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate({
        // Only populate user fields: firstName, lastName, accountType, image
        path: "ratingAndReviews",
        populate: {
          path: "user",
          select: "firstName lastName accountType image",
        },
      })
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course fetched successfully now",
      data: courseDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      success: false,
      message: "Can't Fetch Course Data",
      error: error.message,
    });
  }
};

// Function to get all courses of a particular instructor

export const getInstructorCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const allCourses = await Course.find({ instructor: userId });

    return res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};
//Edit Course Details

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Update thumbnail if provided
    if (req.files?.thumbnailImage) {
      console.log("thumbnail update");
      const thumbnailImage = await uploadImageToCloudinary(
        req.files.thumbnailImage,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields present in the request body
    for (const key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        if (key === "tag" || key === "instructions") {
          try {
            course[key] = JSON.parse(updates[key]);
          } catch {
            // If parsing fails, keep the original value or handle error as needed
            course[key] = updates[key];
          }
        } else if (key !== "courseId") { // Avoid updating courseId itself
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

  //get full course details
  export const getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    const courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userID: userId,
    });

    console.log("courseProgressCount : ", courseProgressCount);

    // Calculate total duration in seconds
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach(content => {
      content.subSection.forEach(subSection => {
        totalDurationInSeconds += parseInt(subSection.timeDuration, 10) || 0;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos || ["none"],
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Delete Course

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Unenroll students from the course
    for (const studentId of course.studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and sub-sections
    for (const sectionId of course.courseContent) {
      const section = await Section.findById(sectionId);
      if (section) {
        for (const subSectionId of section.subSection) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }
      await Section.findByIdAndDelete(sectionId);
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    // Remove course from category's courses array
    await Category.findByIdAndUpdate(course.category._id, {
      $pull: { courses: courseId },
    });

    // Remove course from instructor's courses array
    await User.findByIdAndUpdate(course.instructor._id, {
      $pull: { courses: courseId },
    });

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
//search course by title,description and tags array
export const searchCourse = async (req, res) => {
  try {
    const { searchQuery } = req.body;

    const courses = await Course.find({
      $or: [
        { courseName: { $regex: searchQuery, $options: "i" } },
        { courseDescription: { $regex: searchQuery, $options: "i" } },
        { tag: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .populate("instructor")
      .populate("category")
      .populate("ratingAndReviews")
      .exec();

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//mark lecture as completed

export const markLectureAsComplete = async (req, res) => {
  const { courseId, subSectionId, userId } = req.body;

  if (!courseId || !subSectionId || !userId) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    let progressAlreadyExists = await CourseProgress.findOne({
      userID: userId,
      courseID: courseId,
    });

    // If no progress document exists, create one
    if (!progressAlreadyExists) {
      progressAlreadyExists = await CourseProgress.create({
        userID: userId,
        courseID: courseId,
        completedVideos: [subSectionId],
      });

      return res.status(200).json({
        success: true,
        message: "Lecture marked as complete",
      });
    }

    const { completedVideos } = progressAlreadyExists;

    if (completedVideos.includes(subSectionId)) {
      return res.status(400).json({
        success: false,
        message: "Lecture already marked as complete",
      });
    }

    completedVideos.push(subSectionId);

    await CourseProgress.findOneAndUpdate(
      {
        userID: userId,
        courseID: courseId,
      },
      {
        completedVideos,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Lecture marked as complete",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




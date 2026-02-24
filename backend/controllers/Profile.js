import Profile from "../models/Profile.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

// Method for updating a profile

export const updateProfile = async (req, res) => {
  try {
    const {
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      firstName,
      lastName,
      gender = "",
    } = req.body;

    const id = req.user.id;

    // Get user and profile details
    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    if (!userDetails || !profile) {
      return res.status(404).json({
        success: false,
        message: "User or profile not found",
      });
    }

    // Update User fields
    userDetails.firstName = firstName || userDetails.firstName;
    userDetails.lastName = lastName || userDetails.lastName;

    // Update Profile fields
    profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
    profile.about = about || profile.about;
    profile.gender = gender || profile.gender;
    profile.contactNumber = contactNumber || profile.contactNumber;

    // Save updates
    await Promise.all([userDetails.save(), profile.save()]);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
      userDetails,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;

    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete associated profile
    await Profile.findByIdAndDelete(user.additionalDetails);

    // TODO: Unenroll user from all enrolled courses (if needed)
    // For example:
    // await Course.updateMany(
    //   { studentsEnrolled: id },
    //   { $pull: { studentsEnrolled: id } }
    // );

    // Delete user
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be deleted successfully",
      error: error.message,
    });
  }
};
export const getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Fetched User Details:", userDetails);

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getEnrolledCourses = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const enrolledCourses = await User.findById(id)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
        },
      })
      .populate("courseProgress")
      .exec();

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: enrolledCourses,
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//updateDisplayPicture

export const updateDisplayPicture = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const image = req.files?.pfp;
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
    console.log(uploadDetails);

    const updatedImage = await User.findByIdAndUpdate(
      { _id: id },
      { image: uploadDetails.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: updatedImage,
    });
  } catch (error) {
    console.error("Error updating display picture:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//instructor dashboard

export const instructorDashboard = async (req, res) => {
  try {
    const id = req.user.id;
    const courseData = await Course.find({ instructor: id });

    const courseDetails = courseData.map(course => {
      const totalStudents = course?.studentsEnrolled?.length || 0;
      const totalRevenue = course?.price * totalStudents || 0;

      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudents,
        totalRevenue,
      };
    });

    return res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

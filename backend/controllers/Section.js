import Section from "../models/Section.js";
import Course from "../models/Course.js";

// CREATE a new section
export const createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    const ifcourse = await Course.findById(courseId);
    if (!ifcourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const newSection = await Section.create({ sectionName });

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// UPDATE a section
export const updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;
    console.log(sectionName, sectionId);

    await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error updating section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE a section
export const deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    await Section.findByIdAndDelete(sectionId);

    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section deleted",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

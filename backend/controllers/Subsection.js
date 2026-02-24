import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import Course from "../models/Course.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

// Create a new sub-section for a given section
export const createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description, courseId } = req.body;
    const video = req.files?.videoFile;

    if (!sectionId || !title || !description || !video || !courseId) {
      return res
        .status(404)
        .json({ success: false, message: "All Fields are Required" });
    }

    const ifsection = await Section.findById(sectionId);
    if (!ifsection) {
      return res
        .status(404)
        .json({ success: false, message: "Section not found" });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_VIDEO
    );

    const SubSectionDetails = await SubSection.create({
      title,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection");

    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    return res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    console.error("Error creating new sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// UPDATE a sub-section
export const updateSubSection = async (req, res) => {
  try {
    const { SubsectionId, title, description, courseId } = req.body;
    const video = req.files?.videoFile;

    let uploadDetails = null;
    if (video) {
      uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_VIDEO
      );
    }

    // Get current sub-section details to preserve unchanged fields
    const existingSubSection = await SubSection.findById(SubsectionId);
    if (!existingSubSection) {
      return res.status(404).json({
        success: false,
        message: "Sub-section not found",
      });
    }

    const SubSectionDetails = await SubSection.findByIdAndUpdate(
      SubsectionId,
      {
        title: title || existingSubSection.title,
        description: description || existingSubSection.description,
        videoUrl: uploadDetails?.secure_url || existingSubSection.videoUrl,
      },
      { new: true }
    );

    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    return res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    console.error("Error updating sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// DELETE a sub-section
export const deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, courseId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const ifsubSection = await SubSection.findById(subSectionId);
    const ifsection = await Section.findById(sectionId);

    if (!ifsubSection) {
      return res.status(404).json({
        success: false,
        message: "Sub-section not found",
      });
    }
    if (!ifsection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    await SubSection.findByIdAndDelete(subSectionId);
    await Section.findByIdAndUpdate(
      sectionId,
      { $pull: { subSection: subSectionId } },
      { new: true }
    );

    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    return res
      .status(200)
      .json({ success: true, message: "Sub-section deleted", data: updatedCourse });
  } catch (error) {
    console.error("Error deleting sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

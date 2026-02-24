import express from "express";
const router = express.Router();

// Course Controllers Import
import {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getInstructorCourses,
  editCourse,
  getFullCourseDetails,
  deleteCourse,
  searchCourse,
  markLectureAsComplete,
} from "../controllers/Course.js";

// Categories Controllers Import
import {
  showAllCategories,
  createCategory,
  categoryPageDetails,
  addCourseToCategory,
} from "../controllers/Category.js";

// Sections Controllers Import
import {
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/Section.js";

// Sub-Sections Controllers Import
import {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} from "../controllers/Subsection.js";

// Rating Controllers Import
import {
  createRating,
  getAverageRating,
  getAllRating,
} from "../controllers/RatingAndReviews.js";

// Demo Middleware
import { isDemo } from "../middlewares/demo.js";

// Auth Middlewares
import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth.js";

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, isDemo, createCourse);
// Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, isDemo, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Course
router.post("/getCourseDetails", getCourseDetails);
// Edit a Course
router.post("/editCourse", auth, isInstructor, isDemo, editCourse);
// Get all Courses of a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// Get full course details
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// Delete a Course
router.delete("/deleteCourse", auth, isDemo, deleteCourse);
// Search Courses
router.post("/searchCourse", searchCourse);
// Mark lecture as complete
router.post("/updateCourseProgress", auth, isStudent, markLectureAsComplete);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);
router.post("/addCourseToCategory", auth, isInstructor, addCourseToCategory);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/createRating", auth, isStudent, isDemo, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

export default router;

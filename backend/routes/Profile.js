import express from "express";
const router = express.Router();

import { auth, isInstructor } from "../middlewares/auth.js";
import {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} from "../controllers/Profile.js";
import { isDemo } from "../middlewares/demo.js";

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.delete("/deleteProfile", auth, isDemo, deleteAccount);

router.put("/updateProfile", auth, isDemo, updateProfile);

router.get("/getUserDetails", auth, getAllUserDetails);

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

router.put("/updateDisplayPicture", auth, isDemo, updateDisplayPicture);

// Get instructor dashboard details
router.get("/getInstructorDashboardDetails", auth, isInstructor, instructorDashboard);

export default router;

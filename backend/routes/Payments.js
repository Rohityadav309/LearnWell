import express from "express";
const router = express.Router();

import {
  capturePayment,
  verifySignature,
  sendPaymentSuccessEmail,
} from "../controllers/Payments.js";
import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth.js";

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, verifySignature);
router.post("/sendPaymentSuccessEmail", auth, sendPaymentSuccessEmail);

export default router;

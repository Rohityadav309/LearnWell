import express from "express";
/*
import {Router} from 'express';
const router=Router();

*/
const router = express.Router();

import { contactUs } from "../controllers/ContactUs.js";

router.post("/contactUs", contactUs);

export default router;

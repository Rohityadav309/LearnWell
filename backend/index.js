import express from "express";
import userRoutes from "./routes/User.js";
// import paymentRoutes from "./routes/Payments.js";
import profileRoutes from "./routes/Profile.js";
import CourseRoutes from "./routes/Course.js";
import dbConnect from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { cloudnairyconnect } from "./config/cloudinary.js";
import tester from './controllers/tester.js';

import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
dbConnect();
app.use(express.json());
app.use(cookieParser());

const whitelist = process.env.CORS_ORIGIN ? JSON.parse(process.env.CORS_ORIGIN) : ["*"];

app.use(
  cors({
    origin: whitelist,
    credentials: true,
    maxAge: 14400,
  })
);
// app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudnairyconnect();
app.post('/imageUploded',tester);
app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", CourseRoutes);
app.use("/api/v1/contact", (await import("./routes/ContactUs.js")).default);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

// Define the RatingAndReview schema
const ratingAndReviewSchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: "user",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  course: {
    type: Types.ObjectId,
    required: true,
    ref: "Course",
    index: true,
  },
});

// Export the RatingAndReview model
export default model("RatingAndReview", ratingAndReviewSchema);

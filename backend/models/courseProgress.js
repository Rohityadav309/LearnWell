// models/CourseProgress.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CourseProgressSchema = new Schema({
  courseID: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  completedVideos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubSection',
    },
  ],
});

export default model('CourseProgress', CourseProgressSchema);

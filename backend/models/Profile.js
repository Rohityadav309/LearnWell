// models/Profile.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ProfileSchema = new Schema({
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    trim: true, // Note: `trim` only works with strings, so this will be ignored for Number
  },
});

export default model('Profile', ProfileSchema);

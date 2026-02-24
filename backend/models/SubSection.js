// models/SubSection.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SubSectionSchema = new Schema({
  title: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
});

// Export the model using ES6 export
export default model('SubSection', SubSectionSchema);

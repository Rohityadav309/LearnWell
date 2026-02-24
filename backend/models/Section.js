// models/Section.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SectionSchema = new Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'SubSection',
    },
  ],
});

export default model('Section', SectionSchema);

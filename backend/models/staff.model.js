const mongoose = require('mongoose');
const staffSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: [true, 'Please enter staff first name'],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, 'Please enter staff last name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      required: [true, 'Please enter staff role'],
    },
    reports_to: {
      type: String,
      trim: true,
      required: [true, 'Please enter person staff reports to'],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Staff', staffSchema);
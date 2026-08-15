const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  indexNo: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);

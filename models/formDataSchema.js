
const  mongoose  = require("mongoose");
const UserModel = require("./userSchema");

const formDataSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
    personalDetails: {
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      pinCode: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    academicDetails: {
      graduationYear: { type: String, required: true },
      degree: { type: String, required: true },
      collegeName: { type: String, required: true },
      companyName: { type: String },
    },
    goals: {
      courseGoal: { type: String, required: true },
      targetCompany: { type: String, required: true },
      targetRole: { type: String, required: true },
      placementDate: { type: Date, required: true },
    },
  });
  
  const FormData = mongoose.model('formdatas', formDataSchema);

  module.exports = FormData;
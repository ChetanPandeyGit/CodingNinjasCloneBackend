const mongoose  = require("mongoose");

const cbFormDataSchema = new mongoose.Schema({
  contactNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  graduationYear: { type: String, required: true },
});

const CBFormDataModel = mongoose.model("cbformdata", cbFormDataSchema);

module.exports = CBFormDataModel;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    guardianNameLabel: {
      type: String
    },
    guardianName:{
      type: String
    },
    guardianEmail: {
      type: String,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    emergencyNumber: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    idtype: {
      type: String,
      required: true,
    },
    idnumber: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    nationality: {
      type: String,
    },
    religion: {
      type: String,
    },
  },
  { timestamps: true }
);


export default mongoose.model("users", userSchema);

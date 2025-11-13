import mongoose from "mongoose";
import { createHashedPassword } from "../services/bcryptFeat.js";

const teacherSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      lowercase: true,
      required: true,
    },
    last_name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    teacher_id: {
      type: String,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default:'',
    },
    role: {
      type: String,
      default: "teacher",
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    date_of_birth: {
      type: String,
    },
    years_of_experience:{
      type:String,
    },
    department: {
      type: String,
    },
  },
  { timestamps: true }
);

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await createHashedPassword(this.password);
  next();
});

export default mongoose.model("Teacher", teacherSchema);

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { createHashedPassword } from "../services/bcryptFeat.js";

const studentSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      length: 10,
    },
    password: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },

    profile: {
      type: String,
      default: "",
    },

    address: {
      type: String,
    },
    year_of_graduation: {
      type: String,
    },
    department: {
      type: String,
    },
    course_name: {
      type: String,
    },
    enrollment_number: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await createHashedPassword(this.password);
  next();
});

// studentSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

export default mongoose.model("Student", studentSchema);

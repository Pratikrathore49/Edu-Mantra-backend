import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
      length:10,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    profile: {
      type: String,
      default: "",
    },
    DateofBirth: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

studentSchema.methods.comparePassword =  async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

export default mongoose.model("Student", studentSchema);

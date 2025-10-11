import Student from "../models/student.js";
import { ApiResponse } from "../services/apiResponse.js";
import { makeToken } from "../services/JWTFeat.js";

export const studentRegister = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      mobile,
      password,
      gender,
      DateofBirth,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !mobile ||
      !password ||
      !DateofBirth
    ) {
      return res
        .status(400)
        .json(new ApiResponse(false, "All fields are required", null));
    }
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            "Student already registered with this email",
            null
          )
        );
    }
    const student = await Student.create({
      first_name,
      last_name,
      email,
      mobile,
      password,
      gender,
      DateofBirth,
    });
    if (!student)
      return res
        .status(400)
        .json(new ApiResponse(false, "Failed to register student", null));

    const studentObj = student.toObject();
    delete studentObj.password;

    return res
      .status(200)
      .json(
        new ApiResponse(true, "Student registered successfully", studentObj)
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(false, error.message || "Internal Server Error", null)
      );
  }
};

export const studentLogin = async (req, res) => {
  try {
    console.log("running");
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json(new ApiResponse(false, "All fields are required", null));
    const student = await Student.findOne({ email });
    if (!student)
      return res
        .status(400)
        .json(new ApiResponse(false, "Email or Password is incorrect", null));
    const isMatch = await student.comparePassword(password);
    if (!isMatch)
      return res
        .status(400)
        .json(new ApiResponse(false, "Email or Password is incorrect", null));

    const token = await makeToken({ _id: student._id, role: student.role });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    const studentObj = student.toObject();
    delete studentObj.password;
    return res
      .status(200)
      .json(
        new ApiResponse(true, "Student Logged in successfully", studentObj)
      );
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message || "Internal Server Error", null));
  }
};

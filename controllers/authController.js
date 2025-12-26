import Student from "../models/student.js";
import Teacher from "../models/teacherModel.js";
import { ApiResponse } from "../services/apiResponse.js";
import { comparePassword } from "../services/bcryptFeat.js";
import { makeToken } from "../services/JWTFeat.js";

export const studentRegister = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      mobile,
      password,
      date_of_birth,
      gender,
      enrollment_number,
      department,
      course_name,
      year_of_graduation,
      address,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !mobile ||
      !password ||
      !date_of_birth
    ) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Provide all required fields", null));
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
      date_of_birth,
      gender,
      enrollment_number,
      department,
      course_name,
      year_of_graduation,
      address,
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
    const isMatch = await comparePassword(password, student.password);
    if (!isMatch)
      return res
        .status(400)
        .json(new ApiResponse(false, "Email or Password is incorrect", null));

    const token = await makeToken({
      _id: student._id,
      first_name:student.first_name,
      role: student.role,
      
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 7 * 60 * 60 * 1000,
    });
    const studentObj = student.toObject();
    delete studentObj.password;
    return res
      .status(200)
      .json(
        new ApiResponse(true, "Student Logged in successfully", studentObj)
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(false, error.message || "Internal Server Error", null)
      );
  }
};

export const loginTeacher = async (req, res) => {
  try {
    let { email, password } = req.body;

    let teacher = await Teacher.findOne({ email });
    if (!teacher)
      return res.status(400).json(new ApiResponse(false,"Invalid Password or Email",null))
    let isMatch = await comparePassword(password, teacher.password);

    if (!isMatch)
      return res.status(400).json(new ApiResponse(false,"Invalid Password or Email",null))
    let teacherObj = teacher.toObject();
    delete teacherObj.password;

    const token = await makeToken({  _id: teacher._id,
      role: teacher.role,});
    res.cookie("token", token, {
      httpOnly: true,

      // ================local==============
      // secure: false,  
      // sameSite: "Lax", 
      // ================production==============
      secure: true,  
      sameSite: "None", 
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json(new ApiResponse(200,  `Teacher Login Successfuly`, teacherObj));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message,null));
  }
};

export const registerTeacher = async (req, res) => {
  try {
    let {
      first_name,
      last_name,
      email,
      password,
      mobile,
      profile,
      teacher_id,
      address,
      gender,
      department,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !mobile ||
      !password ||
      !teacher_id
    ) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Provide all required fields", null));
    }
    const isExist = await Teacher.findOne({ $or: [{ email }, { teacher_id }] });
    if (isExist)
      return res
        .status(400)
        .json(new ApiResponse(false, "Teacher already registered", null));

    let teacher = await Teacher.create({
      first_name,
      last_name,
      email,
      password,
      mobile,
      profile,
      teacher_id,
      address,
      gender,
      department,
    });
    if (!teacher)
      return res
        .status(400)
        .json(new ApiResponse(false, "Failed to register teacher", null));

    const teacherObj = teacher.toObject();
    delete teacherObj.password;

    return res
      .status(200)
      .json(
        new ApiResponse(true, "Teacher registered successfully", teacherObj)
      );
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    return res.status(200).json(new ApiResponse(true, "User Logged Out Succefully", null));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
};


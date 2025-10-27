import Student from "../models/student.js";
import { ApiResponse } from "../services/apiResponse.js";

export const getStudentProfile = async (req, res) => {
  try {
    const user = await Student.findById(req.user._id).select("-password");
    if (!user)
      return res
        .status(404)
        .json(new ApiResponse(false, "User not found", user));
    return res
      .status(200)
      .json(new ApiResponse(true, "Successfully Fetched User", user));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

export const updateStudentDetails = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      mobile,
      date_of_birth,
      address,
      year_of_graduation,
      department,
      course_name,
      enrollment_number,
      gender,
    } = req.body;
    const updated = await Student.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          first_name,
          last_name,
          email,
          mobile,
          date_of_birth,
          address,
          year_of_graduation,
          department,
          course_name,
          enrollment_number,
          gender,
        },
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated)
      return res
        .status(404)
        .json(new ApiResponse(false, "User not found", user));
    return res
      .status(200)
      .json(new ApiResponse(true, "Successfully Updated Student ", updated));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

export const changeStudentPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return res
        .status(400)
        .json(new ApiResponse(false, "Enter both old and new passwords", null));
    const user = await Student.findById(req.user._id);
    if (!user)
      return res
        .status(404)
        .json(new ApiResponse(false, "Student Not Found", null));
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json(new ApiResponse(false, "Enter Correct Password", null));

       const hashed = await createHashedPassword(newPassword);
       user.password = hashed;
       await user.save(); 

        return res(200).json(new ApiResponse(true,'Student Password Changed successfully',null))
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

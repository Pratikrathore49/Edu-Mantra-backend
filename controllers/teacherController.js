import TeacherModel from "../models/teacherModel.js";
import { ApiResponse } from "../services/apiResponse.js";
import { comparePassword } from "../services/bcryptFeat.js";

export const getTeacherProfile = async (req, res) => {
  console.log("running");
  try {
    const user = await TeacherModel.findById(req.user._id).select("-password");
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

export const updateTeacherDetails = async (req, res) => {
  console.log("running32");
  try {
    let {
      first_name,
      last_name,
      mobile,
      email,
      date_of_birth,
      gender,
      teacher_id,
      department,
      years_of_experience,
      address,
    } = req.body;

    let updatedTeacher = await TeacherModel.findByIdAndUpdate(
      req.user._id,
      {
        first_name,
        last_name,
        mobile,
        email,
        date_of_birth,
        gender,
        teacher_id,
        department,
        years_of_experience,
        address,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return res
        .status(404)
        .json(new ApiResponse(false, "User Not Updated", null));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Teacher Details Updated Successfully",
          updatedTeacher
        )
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(false, error.message, null));
  }
};


export const changeTeacherPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    console.log("oldPassword", oldPassword, "newPassword", newPassword);
    if (!oldPassword || !newPassword)
      return res
        .status(400)
        .json(new ApiResponse(false, "Enter both old and new passwords", null));

    const user = await TeacherModel.findById(req.user._id);
    if (!user)
      return res
        .status(404)
        .json(new ApiResponse(false, "User Not Found", null));

    const isMatch = await comparePassword(oldPassword, user.password);
    console.log("isMathch", isMatch);
    if (!isMatch)
      return res
        .status(401)
        .json(new ApiResponse(false, "Enter Correct Password", null));

    // const hashed = await createHashedPassword(newPassword);
    user.password = newPassword;
    await user.save();

    return res
      .status(200)
      .json(
        new ApiResponse(true, "Student Password Changed successfully", null)
      );
  } catch (error) {
    console.log("error");
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
}

// //Get details by id Controller
// const getTeacherDetails = async (req, res) => {
//   const id = req.params.id;
//   try {
//     console.log("Params id->", id);
//     const teacher = await TeacherModel.findById(id);

//     if (!teacher) {
//       return res.status(404).json({ message: "Someting went wrong" });
//     }
//     let teacherDetals = teacher.toObject();
//     delete teacherDetals.password;

//     res.status(200).json(teacherDetals);
//   } catch (err) {
//     if (err.name === "CastError") {
//       return res.status(400).json({ message: "Invalid ID format" });
//     }
//     console.error({ Route: "Get Teacher err", message: err.message });
//     res.status(500).json({ Route: "Get Teacher err", message: err.message });
//   }
// };

// //Delete  Controller
// const deleteTeacherInfo = async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const deletedTeacher = await TeacherModel.findByIdAndDelete(_id);
//     if (!deletedTeacher) {
//       return res.status(404).json({ message: "Someting went wrong" });
//     }

//     const details = deletedTeacher.toObject();
//     delete details.password;

//     res.status(200).json({ deleted: details });
//   } catch (err) {
//     console.error({ Route: "Delete err", message: err.message });

//     if (err.name === "CastError") {
//       return res.status(400).json({ message: "Invalid ID format" });
//     }
//     res.status(500).json({ Route: "Delete err", message: err.message });
//   }
// };

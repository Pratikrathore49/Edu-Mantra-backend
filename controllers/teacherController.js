import TeacherModel from '../models/teacherModel.js'




export const getTeacherProfile = async (req, res) => {
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

// const updateTeacherDetails = async (req, res) => {
//   try {
//     const id = req.params.id;
//     let { name, mobile, email } = req.body;

//     let checkTeacher = await Teacher.findOne({ _id: id });
//     if (!checkTeacher) {
//       return res.status(404).json({ message: "Someting went wrong" });
//     }

//     let updatedTeacher = await Teacher.findByIdAndUpdate(
//       id,
//       { name, mobile },
//       { new: true, runValidators: true }
//     );

//     res
//       .status(201)
//       .json({ message: "Update Teacher deatil", update: updatedTeacher });
//   } catch (err) {
//     console.error({ Route: "Update err", message: err.message });
//     if (err.name === "CastError") {
//       return res.status(400).json({ message: "Invalid ID format" });
//     }
//     res.status(500).json({ Route: "Update err", message: err.message });
//   }
// };


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


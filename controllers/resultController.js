import ResultModel from "../models/resultModel.js";
import { ApiResponse } from "../services/apiResponse.js";


export const createOrUpdateResult = async (req, res) => {
  try {
    const { id: paperId } = req.params;
    const studentId = req.user?._id;
    const { answers, score, total, percentage } = req.body;

    if (!paperId || !studentId) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Invalid paper or student ID", null));
    }

    // Step 1: Create or update result
    const updatedResult = await ResultModel.findOneAndUpdate(
      { student: studentId, paper: paperId },
      {
        $set: { answers, score, total, percentage, updatedAt: new Date() },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    // Step 2: Populate all necessary data
    const populatedResult = await ResultModel.findById(updatedResult._id)
      .populate({
        path: "paper",
        populate: {
          path: "question",
        },
      })
      .populate("student", "name email");

    // step 3: Return unified success response
    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Result successfully created or updated",
          populatedResult
        )
      );
  } catch (error) {
    console.error("❌ Error in createOrUpdateResult:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Interna server error", null));
  }
};

export const getResultByStudentAndPaperId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("paper id", id);
    const studentId = req.user._id;
    console.log("student", studentId);

    const result = await ResultModel.findOne({ student: studentId, paper: id })
      .populate({
        path: "paper",
        populate: {
          path: "question",
        },
      })
      .populate("student", "name email");

    if (!result)
      return res
        .status(404)
        .json(new ApiResponse(false, "No Result found", null));

    console.log("result", result);

    return res
      .status(200)
      .json(new ApiResponse(true, "Result Successfully fetched", result));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

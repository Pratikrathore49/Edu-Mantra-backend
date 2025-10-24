import ResultModel from "../models/resultModel.js";
import { ApiResponse } from "../services/apiResponse.js";

export const createOrUpdateResult = async (req, res) => {
  try {
    console.log("running");
    const { id } = req.params;
    console.log("paperID", id);
    const studentId = req.user._id;
    const { answers, score, total, percentage } = req.body;

    const result = await ResultModel.findOneAndUpdate(
      { student: studentId, paper: id },
      {
        answers,
        score,
        total,
        percentage,
        createdAt: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(true, "Result successfully Created or Updated", result)
      );
  } catch (error) {
    console.log("mera errro", error);
    return res.status(500).json(new ApiResponse(false, error.message, null));
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

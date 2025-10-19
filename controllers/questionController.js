import Questions from "../models/questionModel.js";
import { ApiResponse } from "../services/apiResponse.js";

const questionAdd = async (req, res) => {
  let figurePath = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/question/${
        req.file.filename
      }`
    : null;
  try {
    const {
      question,
      type,
      option1,
      option2,
      option3,
      option4,
      answer,
      note,
      figure,
      subject,
      level,
    } = req.body;
    const added = await Questions.create({
      question,
      type,
      option1,
      option2,
      option3,
      option4,
      answer,
      note,
      figure: figurePath,
      subject,
      level,
    });
    res
      .status(200)
      .json(
        new ApiResponse(true, "Question Successfully Added In Data Base", added)
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(false, error, null));
  }
};

const questionGetAll = async (req, res) => {
  let query = req.query;

  const limit = Number(query.limit) || 10;
  const skip = parseInt(query.skip) || 0;
  const select = query.select ? query.select.split(",").join(" ") : null;

  let filterQuery = { ...query };
  ["skip", "limit", "select", "sort"].forEach((key) => {
    delete filterQuery[key];
  });
  const totalQuestions = await Questions.countDocuments();
  try {
    const allQuestions = await Questions.find(filterQuery)
      .select(select)
      .skip(skip)
      .limit(limit)
      

    res.status(200).json(
      new ApiResponse(true, "Question Successfully Fetched", {
        questions: allQuestions,
        totalPages: Math.ceil(totalQuestions / limit),
      })
    );
  } catch (error) {
    res.status(500).json(new ApiResponse(false, error, null));
  }
};

const questionDelete = async (req, res) => {
  try {
    const deleted = await Questions.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json(new ApiResponse(false, "Question not found", null));
    res
      .status(200)
      .json(new ApiResponse(true, "Question Deleted Successfully", deleted));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, error, null));
  }
};

const questionUpdated = async (req, res) => {
  try {
    const updatedQuestion = req.body;
    console.log("usp", updatedQuestion);
    const updated = await Questions.findByIdAndUpdate(
      req.params.id,
      { $set: updatedQuestion },
      { new: true, runValidators: true }
    );

    if (!updated)
      return res
        .status(404)
        .json(new ApiResponse(false, "Question Not Update found", null));
    res
      .status(200)
      .json(new ApiResponse(true, "Question Updated Successfully", updated));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

const questionGetById = async (req, res) => {
  try {
    const question = await Questions.findById(req.params.id);

    if (!question)
      return res
        .status(404)
        .json(new ApiResponse(false, "Question Not Update found", null));
    res
      .status(200)
      .json(new ApiResponse(true, "Question Updated Successfully", question));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

export {
  questionAdd,
  questionGetAll,
  questionDelete,
  questionUpdated,
  questionGetById,
};

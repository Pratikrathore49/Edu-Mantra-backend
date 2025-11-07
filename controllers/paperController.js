import { ApiResponse } from "../services/apiResponse.js";
import paperModel from "../models/papersModel.js";

const addPaper = async (req, res) => {
  try {
    const {
      name,
      question,
      exam,
      subject,
      totalMarks,
      note,
      duration,
      isPaid,
    } = req.body;

    const paper = await paperModel.create({
      name,
      question,
      exam,
      totalMarks,
      note,
      subject,
      duration,
      isPaid,
    });
    if (!paper)
      return res
        .status(400)
        .json(new ApiResponse(false, "Paper Not Created", null));

    res
      .status(200)
      .json(new ApiResponse(true, "Paper Successfully Created", paper));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

const getPaperByID = async (req, res) => {
  try {
    const paper = await paperModel
      .findById({ _id: req.params.id })
      .populate("question");
    if (!paper)
      return res
        .status(404)
        .json(new ApiResponse(false, "Paper not found", null));

    res
      .status(200)
      .json(new ApiResponse(true, "Paper fetched Successfully ", paper));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

const getAllPaper = async (req, res) => {
  try {
    const query = { ...req.query };
    const limit = parseInt(query.limit) || 10;
    let skip = 0;
    if (query.page) {
      const page = parseInt(query.page) || 1;
      skip = (page - 1) * limit;
    } else if (query.skip) {
      skip = parseInt(query.skip) || 0;
    }

    const select = query.select ? query.select.split(",").join(" ") : null;
    const sort = query.sort ? query.sort.split(",").join(" ") : "-createdAt";

    delete query.limit;
    delete query.skip;
    delete query.select;
    delete query.sort;
    delete query.page;
    const totalPapers = await paperModel.countDocuments();
    const papers = await paperModel
      .find(query)
      .select(select)
      .skip(skip)
      .limit(limit)
      .sort(sort);
    if (!papers)
      return res
        .status(404)
        .json(new ApiResponse(false, "Paper not found", null));
    const total = await paperModel.countDocuments(query);
    res.set({ "X-Total-Count": total });

    res
      .status(200)
      .json(
        new ApiResponse(true, "Papers fetched Successfully ", {
          papers: papers,
          totalPages: Math.ceil(totalPapers / limit),
        })
      );
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

const deletePaper = async (req, res) => {
  try {
    const paper = await paperModel.findByIdAndDelete(req.params.id);
    if (!paper)
      return res
        .status(404)
        .json(new ApiResponse(false, "Paper not deleted found", null));

    res
      .status(200)
      .json(new ApiResponse(true, "Paper Deleted Successfully ", paper));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

const updatePaper = async (req, res) => {
  try {
    const updates = req.body;
    const paper = await paperModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!paper)
      return res
        .status(404)
        .json(new ApiResponse(false, "Paper Not Update", null));

    res
      .status(200)
      .json(new ApiResponse(true, "Paper Updated Successfully ", paper));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, error.message, null));
  }
};

export { updatePaper, deletePaper, getAllPaper, getPaperByID, addPaper };

import { ApiResponse } from "../services/apiResponse.js";
import { verifyToken } from "../services/JWTFeat.js";
import axios from "axios";

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res
        .status(400)
        .json(new ApiResponse(false, "Token not Found", null));
    const data = await verifyToken(token);
    if (!data)
      return res
        .status(400)
        .json(new ApiResponse(false, "Provide valid token", null));
    req.user = data;
    next();
  } catch (error) {
    console.log("Error in isLoggedIn middleware:", error);
    res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

const isTeacher = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res
        .status(400)
        .json(new ApiResponse(false, "Token not Found", null));
    const data = await verifyToken(token);
    if (!data)
      return res
        .status(400)
        .json(new ApiResponse(false, "Provide valid token", null));

    if (data.role !== "teacher")
      return res
        .status(400)
        .json(new ApiResponse(false, "Teacher Login Required", null));

    req.user = data;
    next();
  } catch (error) {
    res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

const verifyCaptcha = async (req, res, next) => {
  const captchaToken = req.body.recaptcha;
  if (!captchaToken) {
    return res
      .status(400)
      .json(new ApiResponse(false, "Captcha is required", null));
  }
  try {
    const captchSecret = process.env.CAPTCHA_SECRET_KEY;
    const data =
      await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${captchSecret}&
            response=${captchaToken}`);
    if (!data.data.success) {
      return res
        .status(400)
        .json(new ApiResponse(false, "captcha verification failed", null));
    }
    next();
  } catch (error) {
    console.error("Captcha verification error", error);
    res
      .status(500)
      .json(new ApiResponse(false, "Captcha verification failed", null));
  }
};

export { verifyCaptcha, isLoggedIn, isTeacher };

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
  try {
    const captchaToken = req.body.recaptcha;
    const captchSecret = process.env.CAPTCHA_SECRET_KEY;

    if (!captchaToken) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Captcha is required", null));
    }

    const resData = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      new URLSearchParams({
        secret: captchSecret,
        response: captchaToken,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (!resData.data.success) {
      return res
        .status(400)
        .json(new ApiResponse(false, {a:resData.data}, null));
    }
    next();
  } catch (error) {
    console.error("Captcha verification error", error);
    res
      .status(500)
      .json(new ApiResponse(false,error.message, null));
  }
};

export { verifyCaptcha, isLoggedIn, isTeacher };

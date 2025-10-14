import axios from "axios";
import { ApiResponse } from "../services/apiResponse.js";

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

export default verifyCaptcha;

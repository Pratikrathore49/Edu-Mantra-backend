import express from "express";
import { changeStudentPassword, getStudentProfile, updateStudentDetails } from "../../controllers/studentController.js";
import { isLoggedIn } from "../../middleware/middleware.js";

const router = express.Router();

router.get('/details',isLoggedIn,getStudentProfile)
router.patch('/update',isLoggedIn,updateStudentDetails)
router.patch('/change-pass',isLoggedIn, changeStudentPassword)
export default router;

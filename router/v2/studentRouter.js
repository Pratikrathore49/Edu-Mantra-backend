import express from "express";
import { getStudentProfile, updateStudentDetails } from "../../controllers/studentController.js";
import { isLoggedIn } from "../../middleware/middleware.js";

const router = express.Router();

router.get('/details',isLoggedIn,getStudentProfile)
router.patch('/update',isLoggedIn,updateStudentDetails)
export default router;

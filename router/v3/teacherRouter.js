import express from 'express'
import { getTeacherProfile } from '../../controllers/teacherController.js'
import { isTeacher } from '../../middleware/middleware.js'



const router = express.Router()


router.get('/teachDetails',isTeacher,getTeacherProfile)
// router.get("/:id", getTeacherDetails);
// router.get("/update/:id",updateTeacherDetails)
// router.use("/delete/:id", deleteTeacherInfo);


export default router
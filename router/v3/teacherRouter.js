import express from 'express'
import { changeTeacherPassword, getTeacherProfile, updateTeacherDetails } from '../../controllers/teacherController.js'
import { isTeacher } from '../../middleware/middleware.js'



const router = express.Router()


router.get('/details',isTeacher,getTeacherProfile)
// router.get("/:id", getTeacherDetails);
router.patch("/update",isTeacher,updateTeacherDetails)
// router.use("/delete/:id", deleteTeacherInfo);
router.patch('/change-pass',isTeacher, changeTeacherPassword)


export default router
import express from 'express'
import { loginTeacher, registerTeacher, studentLogin, studentRegister } from '../../controllers/authController.js'
import { verifyCaptcha } from '../../middleware/middleware.js'

const router = express.Router()

router.post("/student/register",studentRegister)
router.post("/student/login",studentLogin)
router.post('/teacher/register',registerTeacher)
router.post("/teacher/login", loginTeacher) //verifyCaptcha,

export default router
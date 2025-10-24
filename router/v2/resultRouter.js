import express from 'express'
import { createOrUpdateResult, getResultByStudentAndPaperId } from '../../controllers/resultController.js'
import { isLoggedIn } from '../../middleware/middleware.js'
const router = express.Router()


router.post('/addResult/:id' ,isLoggedIn,createOrUpdateResult)
router.get("/getResult/:id",isLoggedIn,getResultByStudentAndPaperId)



export default router
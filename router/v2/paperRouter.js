import express from 'express'
import { getAllPaper, getPaperByID } from '../../controllers/paperController.js'


const router = express.Router()


router.get("/",getAllPaper)
router.get("/:id",getPaperByID)




export default router
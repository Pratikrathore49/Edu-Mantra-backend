import express from 'express'
import { getAllPaper, getPaper } from '../../controllers/paperController.js'


const router = express.Router()


router.get("/",getAllPaper)
router.get("/:id",getPaper)




export default router
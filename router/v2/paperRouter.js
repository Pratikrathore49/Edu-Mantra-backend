import express from 'express'
import { getAllPaper, getPaperByID } from '../../controllers/paperController.js'
import { checkPurchase } from '../../controllers/paymentController.js'
import { isLoggedIn } from '../../middleware/middleware.js'


const router = express.Router()

router.get('/isPurchase',isLoggedIn,checkPurchase)
router.get("/",getAllPaper)
router.get("/:id",getPaperByID)




export default router
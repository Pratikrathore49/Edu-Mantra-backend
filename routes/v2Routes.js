import express from 'express'
import paperRouter from '../router/v2/paperRouter.js'
import authRouter from '../router/v2/authRouter.js'
import resultRouter from '../router/v2/resultRouter.js'
import aiRouter from '../router/v2/aiRouter.js'
import studentRouter from '../router/v2/studentRouter.js'
import paymentRouter from '../router/v2/paymentRoutes.js'

const router = express.Router()

router.use('/student',studentRouter)
router.use('/paper',paperRouter)
router.use('/auth',authRouter)
router.use('/result',resultRouter)
router.use("/payment",paymentRouter)
router.use('/ai',aiRouter)

export default router
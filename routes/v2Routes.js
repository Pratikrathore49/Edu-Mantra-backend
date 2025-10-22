import express from 'express'
import paperRouter from '../router/v2/paperRouter.js'
import authRouter from '../router/v2/authRouter.js'
const router = express.Router()

router.use('/paper',paperRouter)
router.use('/auth',authRouter)

export default router
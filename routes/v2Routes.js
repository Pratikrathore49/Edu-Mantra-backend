import express from 'express'
import paperRouter from '../router/v2/paperRouter.js'
import authRouter from '../router/v2/authRouter.js'
import resultRouter from '../router/v2/resultRouter.js'
const router = express.Router()

router.use('/paper',paperRouter)
router.use('/auth',authRouter)
router.use('/result',resultRouter)

export default router
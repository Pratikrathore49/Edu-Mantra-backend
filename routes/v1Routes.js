import express from 'express'
import authRouter from '../router/v1/authRouter.js'
const router = express.Router()


router.use('/auth',authRouter)

export default router
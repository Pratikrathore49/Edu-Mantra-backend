import express from 'express'
const router = express.Router()
import questionRouter from '../router/v3/questionRouter.js'

router.use('/question',questionRouter)

export default router;
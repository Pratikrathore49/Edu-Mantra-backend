import express from 'express'
import paperRouter from '../router/v2/paperRouter.js'
const router = express.Router()

router.use('/paper',paperRouter)

export default router
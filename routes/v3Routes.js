import express from 'express'
const router = express.Router()
import questionRouter from '../router/v3/questionRouter.js'
import paperRouter from '../router/v3/paperRouter.js'

router.use('/question',questionRouter)
router.use('/paper',paperRouter)

export default router;
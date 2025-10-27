import express from 'express';
import { getQuesExplanationByAi } from '../../controllers/aiController.js';
const router = express.Router()

router.post('/quesExplanation', getQuesExplanationByAi)

export default router
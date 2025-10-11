import express from 'express';
const router = express.Router();
import v1Router from './v1Routes.js'
import v2Router from './v2Routes.js'
import v3Router from './v3Routes.js'

router.use('/v1',v1Router)
router.use('/v2',v2Router)
router.use('/v3',v3Router)



export default router;
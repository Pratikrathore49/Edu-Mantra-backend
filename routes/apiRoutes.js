import express from 'express';
const router = express.Router();
import v1Router from './v1Routes'
import v2Router from './v2Routes'
import v3Router from './v3Routes'

router.use('/v1',v1Router)
router.use('/v2',v2Router)
router.use('/v3',v3Router)



export default router;
import express from 'express'

import { deletePaper, updatePaper, addPaper } from '../../controllers/paperController.js'
const router = express.Router();

router.post("/add", addPaper);
router.delete("/delete/:id", deletePaper);
router.patch("/update/:id", updatePaper);

export default router;

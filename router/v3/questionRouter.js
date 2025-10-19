import express from "express";
import { uploads } from "../../config/multer.js";

import {
  questionDelete,
  questionUpdated,
  questionAdd,
  questionGetAll,
} from "../../controllers/questionController.js";

const router = express.Router();

router.delete("/delete/:id", questionDelete);
router.patch("/update/:id", questionUpdated);
router.get("/",questionGetAll)
router.post("/add", uploads.single("figure"), questionAdd);

export default router;

const express = require('express');
const { getTeacherDetails, updateTeacherDetails, deleteTeacherInfo } = require('../../controller/adminController');

const router = express.Router()



router.get("/:id", getTeacherDetails);
router.get("/update/:id",updateTeacherDetails)
router.use("/delete/:id", deleteTeacherInfo);


module.exports = router
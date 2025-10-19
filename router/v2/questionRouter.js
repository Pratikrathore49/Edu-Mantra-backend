const express = require("express")
const { questionGetById, questionGetAll } = require("../../controller/questionController")

const router = express.Router()


router.get('/:id',questionGetById)



module.exports = router
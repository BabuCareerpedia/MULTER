const express = require('express')
const { Model } = require('mongoose')
const router = express.Router()


router.post("/upload",imageController)

module.exports = router
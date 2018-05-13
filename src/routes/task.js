const express = require('express')
const router = express.Router()
const { task } = require('../handlers')
const { get } = task

router.get('/tasks', get)

module.exports = router

const express = require('express')
const router = express.Router()
const { task } = require('../handlers')
const { retrieve, retrieveOne, update, create, setDone, setNotDone } = task

router.get('/tasks', retrieve)
router.get('/tasks/:id', retrieveOne)
router.post('/tasks/', create)
router.put('/tasks/:id', update)
router.put('/tasks/:id/done', setDone)
router.put('/tasks/:id/notdone', setNotDone)

module.exports = router

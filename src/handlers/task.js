const { db } = require('../services/firebase/')
const { validateSnap } = require('./helpers')
const createError = require('http-errors')

const retrieve = (req, res, next) => {
  const ref = db.ref('tasks')

  ref.once('value')
    .then((snap) => validateSnap(res, next, snap))
}

const retrieveOne = (req, res, next) => {
  const { id } = req.params
  const ref = db.ref(`tasks/${id}`)

  ref.once('value')
    .then((snap) => validateSnap(res, next, snap))
}

const create = (req, res, next) => {
  const { name, detail, scheduled } = req.body

  const ref = db.ref('tasks')

  ref.push({
    name,
    detail,
    scheduled,
    done: false
  })
    .then((newTask) => {
      res.json({ success: true, id: newTask.key })
    })
    .catch(() => next(createError(400)))
}

const update = (req, res, next) => {
  const { body, params } = req
  const updatable = ['name', 'detail', 'scheduled', 'done']
  const { id } = params
  const ref = db.ref(`tasks/${id}`)

  const payload = updatable
    .reduce((payload, key) => {
      if (body.hasOwnProperty(key)) {
        payload[key] = body[key]
      }

      return payload
    }, {})

  ref.update(payload)
    .then(() => res.json({ success: true, id: ref.key }))
    .catch((err) => next(err))
}

const setDone = (req, res) => {
  req.body.done = true

  update(req, res)
}

const setNotDone = (req, res) => {
  req.body.done = false

  update(req, res)
}

const remove = (req, res, next) => {
  const { id } = req.params

  const ref = db.ref(`tasks/${id}`)

  ref.remove()
    .then(() => res.json({ success: true }))
    .catch((err) => next(err))
}

module.exports = {
  retrieve,
  retrieveOne,
  create,
  update,
  setDone,
  setNotDone,
  remove
}

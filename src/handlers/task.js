const { db } = require('../services/firebase/')
const { validateSnap } = require('./helpers')
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

const create = (req, res) => {
  const { name, detail, scheduled, user } = req.body

  const resp = db.ref('tasks').push({
    name,
    detail,
    scheduled,
    user,
    done: false
  })

  res.json({ success: true, id: resp.key })
}

const update = (req, res) => {
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

  ref.update(payload).then(console.log)

  res.json({ success: true, id: ref.key })
}

const setDone = (req, res) => {
  req.body.done = true

  update(req, res)
}

const setNotDone = (req, res) => {
  req.body.done = false

  update(req, res)
}

module.exports = {
  retrieve,
  retrieveOne,
  create,
  update,
  setDone,
  setNotDone
}

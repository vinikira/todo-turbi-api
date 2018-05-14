const { db } = require('../services/firebase/')

const retrieve = (req, res) => {
  const { user, filter } = req.query
  const ref = db.ref('tasks')

  ref.once('value', (snap) => res.json(snap.val()))
}

const retrieveOne = (req, res) => {
  const { id } = req.params
  const ref = db.ref(`tasks/${id}`)

  ref.once('value', (snap) => res.json(snap.val()))
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

  console.log(resp)

  res.json({ success: true, id: resp.key })
}

const update = (req, res) => {
  const { body, params } = req
  const { name, detail, scheduled, done } = body
  const { id } = params
  const ref = db.ref(`tasks/${id}`)

  res.json({ success: true, id: ref.key })
}

const makeDone = (req, res) => {
  req.body.done = true

  update(req, res)
}

const makeUnDone = (req, res) => {
  req.body.done = false

  update(req, res)
}

module.exports = {
  retrieve,
  retrieveOne,
  create,
  update,
  makeDone,
  makeUnDone
}

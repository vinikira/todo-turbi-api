require('dotenv').config()

const test = require('ava')
const request = require('supertest')
const app = require('../app.js')
const createTask = (app) => request(app)
  .post('/v1/tasks')
  .set('Content-Type', 'application/json')
  .send({
    name: 'task1',
    detail: 'details of task 1',
    scheduled: new Date()
  })
const removeTask = (app) => (id) => request(app)
  .delete(`/v1/tasks/${id}`)
  .set('Content-Type', 'application/json')
  .send()

let id = ''

test.before('generate temporary task', async (t) => {
  const resp = await createTask(app)

  if (resp.status === 200) {
    id = resp.body.id
  }
})

test.after.always('guaranteed that temporary task is removed', async (t) => {
  await removeTask(app)(id)
})

test('should create a task', async (t) => {
  const res = await request(app)
    .post('/v1/tasks')
    .set('Content-Type', 'application/json')
    .send({
      name: 'task1',
      detail: 'details of task 1',
      scheduled: new Date()
    })

  t.is(res.status, 200)
  t.true(res.body.success)
  t.is(typeof res.body.id, 'string')

  await removeTask(app)(res.body.id)
})

test('should not create a task', async (t) => {
  const res = await request(app)
    .post('/v1/tasks')
    .set('Content-Type', 'application/json')
    .send({
      names: 'task1',
      details: 'details of task 1',
      schedulede: new Date()
    })

  t.is(res.status, 400)
  t.false(res.body.success)
  t.not(typeof res.body.id, 'string')
})

test('should update a task', async (t) => {
  const res = await request(app)
    .put(`/v1/tasks/${id}`)
    .send({
      name: 'task1',
      details: 'details of task 1',
      scheduled: new Date(),
      done: false
    })

  t.is(res.status, 200)
  t.is(typeof res.body.id, 'string')
})

test('should set task to done', async (t) => {
  const res = await request(app)
    .put(`/v1/tasks/${id}/done`)
    .send()

  t.is(res.status, 200)
  t.true(res.body.success)
  t.is(typeof res.body.id, 'string')
})

test('should set task to not done', async (t) => {
  const res = await request(app)
    .put(`/v1/tasks/${id}/notdone`)
    .send()

  t.is(res.status, 200)
  t.true(res.body.success)
  t.is(typeof res.body.id, 'string')
})

test('should delete a task', async (t) => {
  const res = await request(app)
    .delete(`/v1/tasks/${id}`)
    .send()

  t.is(res.status, 200)
  t.true(res.body.success)
})

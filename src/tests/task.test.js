require('dotenv').config()

const test = require('ava')
const request = require('supertest')
const app = require('../app.js')
const createTask = (app) => request(app)
  .post('/v1/tasks')
  .set('Content-Type', 'application/json')
  .send({
    name: 'task1',
    details: 'details of task 1',
    scheduled: new Date()
  })

test('should create a task', async (t) => {
  const res = await createTask(app)

  t.is(res.status, 200)
  t.is(res.body.name, 'task1')
  t.is(res.body.details, 'details of task 1')
  t.not((new Date(res.body.scheduled)).toString(), 'Invalid Date')
  t.is(typeof res.body.done, 'boolean')
})

// test('should update a task', async (t) => {
//   const res = await request(app)
//     .post('/v1/tasks')
//     .send({
//       name: 'task1',
//       details: 'details of task 1',
//       scheduled: new Date(),
//       done: false
//     })

//   t.is(res.status, 200)
//   t.is(res.body.email, 'ava@rocks.com')
// })

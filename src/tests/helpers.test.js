require('dotenv').config()

const test = require('ava')
const { validateSnap, validateTaskSchema } = require('../handlers/helpers.js')

test('the snap should be valid', (t) => {
  const mock = {
    res: {
      json: (obj) => obj
    },
    next: () => false,
    snap: {
      exists: () => true,
      val: () => 'I exist.'
    }
  }

  const res = validateSnap(mock.res, mock.next, mock.snap)

  t.deepEqual(res, mock.snap.val())
})

test('the snap should be not valid', (t) => {
  const mock = {
    res: {
      json: (obj) => obj
    },
    next: () => false,
    snap: {
      exists: () => false
    }
  }

  const res = validateSnap(mock.res, mock.next, mock.snap)

  t.false(res)
})

test('the schema should be valid', (t) => {
  const obj = {
    name: 'test',
    detail: 'test detail',
    scheduled: new Date(),
    done: false
  }

  const res = validateTaskSchema(obj)

  t.true(res.success)
  t.is(Object.keys(res.messages).length, 0)
})

test('the schema should be not valid', (t) => {
  const obj = {
    name: 3,
    detail: false,
    done: 'false'
  }

  const res = validateTaskSchema(obj)

  t.false(res.success)
  t.not(Object.keys(res.messages).length, 0)
})

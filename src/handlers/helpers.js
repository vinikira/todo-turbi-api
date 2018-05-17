const validateSnap = (res, next, snap) =>
  snap.exists() ? res.json(snap.val()) : next()

const errHandler = (next) => (err) => next(err)

const validate = (schema, obj) => {
  const validators = {
    string: (field) => typeof field === 'string',
    boolean: (field) => typeof field === 'boolean',
    date: (field) => new Date(field).toString() !== 'Invalid Date',
    array: Array.isArray,
    object: (field) => typeof field === 'object'
  }

  return Object
    .keys(schema)
    .reduce((resp, key) => {
      const fieldSchema = schema[key]

      if ((!obj.hasOwnProperty(key) && schema[key].required) ||
          (obj.hasOwnProperty(key) &&
           !validators[fieldSchema.type](obj[key]))) {
        resp.success = false
        resp.messages[key] = fieldSchema.message
      }

      return resp
    }, { messages: {}, success: true })
}

const validateTaskSchema = (body) => {
  const schema = {
    name: {
      type: 'string',
      message: 'Name must be a string and is required.',
      required: true
    },
    detail: {
      type: 'string',
      message: 'Detail must be a string'
    },
    done: {
      type: 'boolean',
      message: 'Done must be a boolean. Default is false.'
    },
    scheduled: {
      type: 'date',
      message: 'Scheduled must be a date and is required.',
      required: true
    }
  }

  return validate(schema, body)
}

module.exports = {
  validateSnap,
  errHandler,
  validateTaskSchema
}

const task = require('./task')

module.exports = (app) => {
  app.use('/v1', task)
}

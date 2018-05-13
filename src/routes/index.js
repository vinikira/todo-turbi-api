const task = require('./task')

module.exports = (app) => {
  app.use('/', task)
}

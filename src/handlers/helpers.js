const validateSnap = (res, next, snap) =>
  snap.exists() ? res.json(snap.val()) : next()

const errHandler = (next) => (err) => next(err)

module.exports = {
  validateSnap,
  errHandler
}

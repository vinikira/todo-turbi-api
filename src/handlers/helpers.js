const validateSnap = (res, next, snap) =>
  snap.exists() ? res.json(snap.val()) : next()

module.exports = {
  validateSnap
}

const get = (req, res) => {
  res.json({id: 1, details: 'teste', schedule: new Date(), done: false})
}

module.exports = {
  get
}


// checks if the user accessing this endpoint is an admin
const adminOnly = (req, res, next) => {
  // if the role is not admin then forbid the user
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'admin only' })
  }
  next()
}

module.exports = {adminOnly}

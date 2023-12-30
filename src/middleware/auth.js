const { User } = require('../models')

const authentication = async (req, res, next) => {
	const user = await User.findOne({ where: { username: req.body.username, password: req.body.password } })
	if (user)
		next()
	else
		res.status(401).json({
			message: 'Unauthorized'
		})
}
module.exports = {
	authentication
}
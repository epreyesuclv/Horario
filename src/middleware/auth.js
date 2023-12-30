const { User } = require('../models')

const authentication = async (req, res, next) => {
	const { ['authorization-user']: username, ['authorization-password']: password } = req.headers
	console.log(req.headers)
	const user = await User.findOne({ where: { username, password } })
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
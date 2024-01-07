const { User } = require('../models')

const express = require('express')
const router = express.Router()

router.post('/login', async (req, res) => {
	const user = await User.findOne({ where: { username: req.body.username, password: req.body.password } })
	if (user)
		res.status(200).json(user)
	else
		res.status(401).json({
			message: 'Unauthorized'
		})
})

module.exports = router

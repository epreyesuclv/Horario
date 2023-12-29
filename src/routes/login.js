const { User } = require('../models')

const express = require('express')
const router = express.Router()

router.post('/login', async (req, res) => {
	console.log(await User.findAll())
	const user = await User.findOne({ where: { username: req.body.username, password: req.body.password } })
	console.log(user)
	if (user)
		res.status(200).json({
			message: 'OK'
		})
	else
		res.status(401).json({
			message: 'Unauthorized'
		})
})

module.exports = router

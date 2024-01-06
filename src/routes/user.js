const { authentication } = require('../middleware/auth')
const { User } = require('../models')

const express = require('express')
const router = express.Router()

// router.use(authentication)
router.get('/user', async (req, res) => {
	const profs = await User.findAll()
	res.status(200).json(profs)
})
router.post('/user', async (req, res) => {
	const { username, password, role } = req.body
	console.log("user create", req.body)

	const prof = await User.create({ username, password, role })
	if (prof) {
		res.status(200).json({
			message: 'OK'
		})
	}
	else
		res.status(402).json({
			message: 'Not Found'
		})
})
router.put('/user', async (req, res) => {
	console.log("User update")
	const { id, username, password, role } = req.body
	const prof = await User.update({ username, password, role }, { where: { id } })
	if (prof) {
		res.status(200).json({
			message: 'OK'
		})
	}
	else
		res.status(402).json({
			message: 'Not Found'
		})
})
router.delete('/user/:id', async (req, res) => {
	console.log(req.params)
	const { id } = req.params
	const prof = await User.findByPk(id)
	if (prof) {
		await prof.destroy()
		res.status(200).json({
			message: 'OK'
		})
	}
	else
		res.status(402).json({
			message: 'Not Found'
		})
})

module.exports = router

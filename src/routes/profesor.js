const { authentication } = require('../middleware/auth')
const { User, Profesor } = require('../models')

const express = require('express')
const router = express.Router()

// router.use(authentication)
router.put('/profesor', async (req, res) => {
	const { id, name } = req.body
	const prof = await Profesor.findByPk(id)
	if (prof) {
		prof.name = name
		await prof.update({ name })
		res.status(200).json({
			message: 'OK'
		})
	}
	else
		res.status(402).json({
			message: 'Not Found'
		})
})
router.delete('/profesor', async (req, res) => {
	const { id } = req.body
	const prof = await Profesor.findByPk(id)
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

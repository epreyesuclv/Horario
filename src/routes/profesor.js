const { authentication } = require('../middleware/auth')
const { User, Profesor } = require('../models')

const express = require('express')
const router = express.Router()

// router.use(authentication)
router.get('/profesor', async (req, res) => {
	const profs = await Profesor.findAll()
	res.status(200).json(profs)
})
router.post('/profesor', async (req, res) => {
	console.log("profesor create")
	const { nombre } = req.body
	const prof = await Profesor.create({ nombre })
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
router.put('/profesor', async (req, res) => {
	console.log("profesor update")
	const { id, nombre } = req.body
	const prof = await Profesor.update({ nombre }, { where: { id } })
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
router.delete('/profesor/:id', async (req, res) => {
	console.log(req.params)
	const { id } = req.params
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

;
const express = require('express')
const { Curso } = require('../models')
const router = express.Router()


router.post('/curso', async (req, res) => {
	const { carrera, anno, semestre, finishDate: fin, startDate: inicio } = req.body

	let curso = await Curso.findOne({ where: { carreraId: carrera, anno, semestre } })
	if (!curso)
		curso = await Curso.create({ carreraId: carrera, anno, semestre, inicio, fin })

	res.status(200).json(curso.toJSON())
})

router.put('/curso', async (req, res) => {
	const { id, data } = req.body
	const curso = await Curso.findByPk(id)
	await curso.update(data)
	res.status(200).json({ message: 'OK' })
})

module.exports = router

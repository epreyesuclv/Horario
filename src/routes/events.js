;
const express = require('express')
const { Horario, Profesor, Asignatura, AsignProfCurso, Curso, Evento } = require('../models')
const router = express.Router()

router.get('/event', async (req, res) => {
	const { } = req.params
	let curso = await Curso.findOne({ where: { carreraId: carrera, anno, semestre } })
	if (!curso)
		curso = await Curso.create({ carreraId: carrera, anno, semestre })
})

router.post('/event', async (req, res) => {
	console.log(req.body)
	const { event, formData } = req.body
	const { carrera, anno, semestre } = formData

	let curso = await Curso.findOne({ where: { carreraId: carrera, anno, semestre } })
	if (!curso)
		curso = await Curso.create({ carreraId: carrera, anno, semestre })

	await Evento.create({ cursoId: curso.id, ...event })
	res.status(200).json({ message: 'OK' })
})

router.delete('/event', async (req, res) => {
	console.log(req.params)
	const { id } = req.params

	res.status(200).json({ message: 'OK' })
})

module.exports = router

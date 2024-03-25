const { authentication } = require('../middleware/auth')
const { User, Profesor, Asignatura, AsignProfCurso, Turno } = require('../models')

const express = require('express')
const router = express.Router()

// router.use(authentication)
router.get('/profesor', async (req, res) => {
	const profs = await Profesor.findAll()
	res.status(200).json(profs)
})

router.get('/profesor/:id', async (req, res) => {
	const prof = await Profesor.findByPk(req.params.id)
	const asignaturas = []
	const asignProf = await AsignProfCurso.findAll({
		where: {
			profesorId: req.params.id
		},
		include: [Turno, Asignatura]
	})
	
	asignProf.forEach(element => {
		element.turnos.forEach(turno => {
			const semana = prof.restricciones?.horario.find(value => value.num == turno.semana).semana
			semana[turno.dia][turno.turno] = element.asignaturaId
		})
		asignaturas.push({ id: element.asignaturaId, nombre: element.asignatura.nombre })
	})
	res.status(200).json({ prof, asignaturas })
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
	const { id, nombre, restricciones } = req.body
	const prof = await Profesor.findByPk(id)

	if (nombre)
		prof.nombre = nombre
	if (restricciones)
		prof.restricciones = restricciones

	await prof.save()
	await prof.reload()
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

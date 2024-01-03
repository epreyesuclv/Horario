const { Horario, Profesor, Asignatura, AsignProfCurso, Curso, Carrera } = require('../models')
// const { authentication } = require('../middleware/auth')
const express = require('express')
const router = express.Router()

// router.use(authentiecation)
router.post('/horario', async (req, res) => {
	const { } = req.body

	//
	const horario = {}
	if (horario)
		res.status(200).json({
			message: 'OK'
		})
	else
		res.status(401).json({
			message: 'Unauthorized'
		})
})

router.get('/carreras', async (req, res) => {
	const carreras = await Carrera.findAll()
	res.status(200).json(carreras)
})

router.get('/getAsignaturaByCarrera', async (req, res) => {
	const { semestre, anno, carrera } = req.query

	const allAsignaturas = await Asignatura.findAll({
		include: [{
			model: AsignProfCurso,
			require: true,
			include: [{
				require: true,
				model: Curso,
				where: {
					semestre,
					anno
				},
				include: [{
					require: true,
					model: Carrera,
					where: {
						id: carrera
					}
				}]
			}]
		}]
	})

	res.json(allAsignaturas.filter(value => value.asignProfCursos.length))
})

router.put('/asignatura', async (req, res) => {
	const { asignProfId, profesor, frecuency } = req.body
	console.log(req.body)
	const asignatura = await AsignProfCurso.update({ profesorId: profesor, frecuency }, { where: { id: asignProfId } })
	res.json(asignatura)
})

router.post('/asignatura', async (req, res) => {
	const { asignName, profesorId, carrera, anno, frecuency, semestre } = req.body
	console.log(req.body)

	let curso = await Curso.findOne({ where: { carreraId: carrera, anno, semestre } })
	if (!curso)
		curso = await Curso.create({ carreraId: carrera, anno, semestre })

	let asignatura = await Asignatura.findOne({ where: { nombre: asignName } })
	if (!asignatura)
		asignatura = await Asignatura.create({ nombre: asignName })

	const asignProfCourso = await AsignProfCurso.create({ profesorId, asignaturaId: asignatura.id, cursoId: curso.id, frecuency })
	res.json(asignProfCourso)
})

module.exports = router

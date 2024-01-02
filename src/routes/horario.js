const { Horario, Asignatura, AsignProfCurso, Curso, Carrera } = require('../models')
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
	res.json(allAsignaturas)
})

router.put('/asignatura', async (req, res) => {
	const { asignProfId, profesor } = req.body
	console.log(req.body)
	const asignatura = await AsignProfCurso.update({ profesorId: profesor }, { where: { id: asignProfId } })
	res.json(asignatura)
})

module.exports = router

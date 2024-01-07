const { fill, openSchedule, checkallHour } = require('../controllers/horario')
const { Horario, Profesor, Asignatura, AsignProfCurso, Curso, Carrera } = require('../models')
// const { authentication } = require('../middleware/auth')
const express = require('express')
const router = express.Router()

// router.use(authentiecation)
/**
 * const horarioData = {
	amountSemanas: 3,
	fechaInicio: moment(),
	asignaturas: [{ id: 1, nombre: "Programacion", frecuency: 32 }, { id: 2, nombre: "Matematica", frecuency: 32 }, { id: 3, nombre: "Fisisca", frecuency: 32 }],
	horario: [{
		num: 1,
		semana: [
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"]
		]
	},
	{
		num: 2,
		semana: [
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"]
		]
	},
	{
		num: 3,
		semana: [
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"]
		]
	}]
}
 */


router.post('/horario', async (req, res) => {
	const { semestre, anno, startDate, carrera, time, semanas } = req.body
	console.log(req.body)

	const curso = await Curso.findOne({
		where: {
			semestre,
			anno,
			carreraId: carrera
		},
		include: [{ model: AsignProfCurso, include: Asignatura }]
	})
	const asignaturas = curso.asignProfCursos
	//{ id: 3, nombre: "Fisisca", frecuency: 32 }]
	const horario = {
		amountSemanas: Number(semanas),
		fechaInicio: startDate,
		asignaturas: asignaturas.map(value => ({ id: value.asignatura.id, nombre: value.asignatura.nombre, frecuency: value.frecuency })),
		horario: []
	}
	const arrayFrecuency = []

	for (let i = 0; i < horario.asignaturas.length; i++) {
		const asignatura = horario.asignaturas[i]
		arrayFrecuency[asignatura.id] = Number(asignatura.frecuency) / 2
	}

	for (let i = 0; i < horario.amountSemanas; i++) {

		const data = {
			num: i + 1,
			semana: [
				["-", "-", "-", "-", "-", "-"],
				["-", "-", "-", "-", "-", "-"],
				["-", "-", "-", "-", "-", "-"],
				["-", "-", "-", "-", "-", "-"],
				["-", "-", "-", "-", "-", "-"],
			]
		}
		let breaker = true
		while (breaker && checkallHour(arrayFrecuency))
			for (let j = 0; j < horario.asignaturas.length; j++) {
				if (arrayFrecuency[horario.asignaturas[j].id] > 0) {
					arrayFrecuency[horario.asignaturas[j].id]--
					breaker = fill(data.semana, horario.asignaturas[j], time)
				}
			}
		console.log(data)
		horario.horario.push(data)
	}

	const newHOrario = await Horario.create({
		cursoId: curso.id,
		code: "Curso-" + horario.fechaInicio,
		info: JSON.stringify(horario)
	})
	res.status(200).json({ horario: newHOrario.id })
})

router.put('/horario', async (req, res) => {
	const { id, info, code } = req.body
	const horario = await Horario.findOne({ where: { id } })
	await horario.update({ info, code })
	res.status(200).json(horario)
})

router.get('/horario', async (req, res) => {
	const horarios = await Horario.findAll({
		include: [{
			model: Curso,
			include: [{
				model: AsignProfCurso,
				include: [Asignatura, Profesor]
			}, Carrera]
		}
		]
	})
	res.status(200).json(horarios)
})

router.delete('/horario/:id', async (req, res) => {
	const { id } = req.params
	const horario = await Horario.findOne({ where: { id } })
	await horario.destroy()
	res.status(200).json(horario.info)
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

router.get('/horario/:id', async (req, res) => {
	const { id } = req.params
	const horario = await Horario.findOne({ where: { id } })
	res.json(horario.info)
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

router.post('/asignaProfCurso/deleteBulk', async (req, res) => {
	const { ids } = req.body
	console.log(req.body)
	res.json(await AsignProfCurso.destroy({ where: { id: ids } }))
})

module.exports = router

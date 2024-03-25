const { fill, openSchedule, checkallHour } = require('../controllers/horario')
const { Horario, Profesor, Asignatura, AsignProfCurso, Curso, Carrera, Turno } = require('../models')
// const { authentication } = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const moment = require('moment')
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
	const { cursoId, eventList, events, time } = req.body
	const curso = await Curso.findOne({
		where: {
			id: cursoId
		},
		include: [{ model: AsignProfCurso, include: [Profesor, Asignatura] }]
	})
	const asignaturas = curso.asignProfCursos
	//{ id: 3, nombre: "Fisisca", frecuency: 32 }]
	const horario = {
		amountSemanas: Number(moment(curso.fin).diff(moment(curso.inicio), 'weeks') + 1),
		fechaInicio: curso.inicio,
		asignaturas: asignaturas.map((value, index) => ({ id: value.asignatura.id, index, asignProfCursoId: value.id, nombre: value.asignatura.nombre, frecuency: value.frecuency, profesor: value.profesor })),
		eventList: eventList || [],
		horario: []
	}
	const arrayFrecuency = []

	for (let i = 0; i < horario.asignaturas.length; i++) {
		const asignatura = horario.asignaturas[i]
		arrayFrecuency[asignatura.id] = Number(asignatura.frecuency) / 2
	}


	// checking all profesor has restriction
	const fixAllProfesors = async (profesor) => {
		if (!profesor.restricciones) {
			// generate <semanas> data
			const data = []
			for (let i = 0; i < horario.amountSemanas; i++) {
				data.push({
					num: i + 1,
					semana: [
						["-", "-", "-", "-", "-", "-"],
						["-", "-", "-", "-", "-", "-"],
						["-", "-", "-", "-", "-", "-"],
						["-", "-", "-", "-", "-", "-"],
						["-", "-", "-", "-", "-", "-"],
					]
				})
			}
			await profesor.update({ restricciones: { horario: data, startDate: curso.inicio, finishDate: curso.fin }, })
		}

	}

	await Promise.all(asignaturas.map(async a => {
		return fixAllProfesors(a.profesor)
	}))
	await curso.reload()

	for (let i = 0; i < horario.amountSemanas; i++) {

		const data = events.find(e => e.num === i + 1)
		console.log("prevouis data", data)
		if (data.veto) continue

		let breaker = true
		while (breaker && checkallHour(arrayFrecuency))
			for (let j = 0; j < horario.asignaturas.length; j++) {
				if (arrayFrecuency[horario.asignaturas[j].id] > 0) {
					arrayFrecuency[horario.asignaturas[j].id]--
					breaker = await fill(data, horario.asignaturas[j], time)
				}
			}
		console.log(data, arrayFrecuency)
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
	const { cursoId } = req.query

	const allAsignaturas = await AsignProfCurso.findAll({
		where: {
			cursoId
		},
		include: [{
			require: true,
			model: Curso,
			where: {
				id: cursoId,
			},
			include: [{
				require: true,
				model: Carrera,
			}]
		}, Asignatura]
	})

	res.json(allAsignaturas)
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
	const { asignName, profesorId, carrera, cursoId, frecuency } = req.body
	console.log(req.body)
	const curso = await Curso.findByPk(cursoId)

	let asignatura = await Asignatura.findOne({ where: { nombre: asignName } })
	if (!asignatura)
		asignatura = await Asignatura.create({ nombre: asignName, carreraId: carrera, })

	const asignProfCourso = await AsignProfCurso.create({ profesorId, asignaturaId: asignatura.id, cursoId: curso.id, frecuency })
	res.json(asignProfCourso)
})

router.delete('/asignaProfCurso', async (req, res) => {
	const { id } = req.query
	res.json(await AsignProfCurso.destroy({ where: { id } }))
})

router.put('/turno', async (req, res) => {
	const { semana, dia, turno } = req.body
	await Turno.update({ asignProfCursoId: req.body.info }, { where: { semana, dia, turno } })
	res.status(200)
})

module.exports = router

const { Turno, AsignProfCurso } = require('../models')

const openSchedule = (semana) => {
	// console.log(semana)
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 6; j++) {
			// console.log(semana[i][j])
			if (semana[i][j] === '-') {
				return true
			}
		}
	}
	return false
}
// esta funcion te inserta un turno en la semana disponible
const fill = async (data, asign, horario) => {
	const matriz = data.semana
	const matrizP = asign.profesor.restricciones?.horario.find(value => value.num === data.num)?.semana

	// preprocess matrizP
	const allCursos = await AsignProfCurso.findAll({ where: { profesorId: asign.profesor.id }, include: [Turno] })

	// console.log(allCursos[0].turnos[0], data.num)

	const isProfesorRestricted = (i, j) => {
		const hasTurno = allCursos.some(asign => asign.turnos.some(turno => turno.semana == data.num && turno.dia == i && turno.turno == j))
		// console.log(allCursos.map(value => value.toJSON()), hasTurno)
		return matrizP[i][j] !== '-' || hasTurno
	}

	const setTurno = async (i, j, asignId) => {
		await Turno.create({ semana: data.num, dia: i, turno: j, asignProfCursoId: asignId })
	}

	const EDUCACION_FISICA = "Educación Física"
	let start = 0
	let end = 3
	if ((horario === 'Tarde' && !asign.nombre.startsWith(EDUCACION_FISICA))
		|| (horario === 'Mañana' && asign.nombre.startsWith(EDUCACION_FISICA))) {
		start = 3
		end = 6
	}
	// dada la semana la amtriz y la asignatura , buscar un lugar donde poner la asignatura en la matriz
	for (let i = 0; i < 5; i++) {
		for (let j = start; j < end; j++) {
			if (matriz[i][j] === '-' && !isProfesorRestricted(i, j)) {
				matriz[i][j] = asign.index
				await setTurno(i, j, asign.asignProfCursoId)
				return true
			}
		}
	}
	// console.log(asign.horas)
	return false
}

const checkallHour = (asignaturas) => {
	let valid = false

	asignaturas.forEach(frecuency => {
		if (frecuency > 0) {
			valid = true
		}
	})
	console.log('checkallHour', valid)

	return valid
}

module.exports = {
	fill,
	openSchedule,
	checkallHour
}

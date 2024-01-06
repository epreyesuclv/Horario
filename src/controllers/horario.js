const openSchedule = (semana) => {
	// console.log(semana)
	// dada la semana la amtriz y la asignatura , buscar un lugar donde poner la asignatura en la matriz
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

const fill = (matriz, asign, horario) => {
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
			if (matriz[i][j] === '-') {
				matriz[i][j] = asign.id
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

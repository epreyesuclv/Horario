import { apiClient, getHeaders } from './index'

export const deleteProfesor = (id) => {
	return apiClient.delete('/profesor/' + id, {
		headers: {
			...getHeaders(),
		}
	})
}

export const getAllProfesors = () => {
	return apiClient.get('/profesor', {
		headers: {
			...getHeaders(),
		}
	})
}

export const getProfesor = (id) => {
	return apiClient.get('/profesor/' + id, {
		headers: {
			...getHeaders(),
		}
	})
}

export const updateProfesor = (id, name, restricciones) => {
	return apiClient.put("/profesor", { id, nombre: name, restricciones }, {
		headers: {
			...getHeaders(),
		}
	})
}
export const addProfesor = (name) => {
	return apiClient.post('/profesor', { nombre: name }, {
		headers: {
			...getHeaders(),
		}
	})
}

export const getCarreras = (name) => {
	return apiClient.get('/carreras', {
		headers: {
			...getHeaders(),
		}
	})
}

export const getAllAsignaturasBy = (curso) => {
	return apiClient.get('/getAsignaturaByCarrera', {
		params: {
			cursoId: curso.id
		},
		headers: {
			...getHeaders(),
		}
	})
}
export const deleteAsignatura = (id) => {
	return apiClient.delete('/asignaProfCurso', { params: { id } }, {
		headers: {
			...getHeaders(),
		}
	})
}


export const updateAsignatura = (id, profesor, frecuency) => {
	return apiClient.put('/asignatura', { asignProfId: id, profesor, frecuency }, {
		headers: {
			...getHeaders(),
		}
	})
}

export const createNewAsignaturaForCurso = (asignName, profesorId, frecuency, cursoId) => {
	return apiClient.post('/asignatura', { asignName, profesorId, frecuency, cursoId }, {

	})
}

export const addusuario = (username, password, role) => {

	return apiClient.post('/user', { username, password, role }, {
		headers: {
			...getHeaders(),
		}
	})
}

export const getAllusuarios = () => {
	return apiClient.get('/user', {
		headers: {
			...getHeaders(),
		}
	})
}

export const updateusuario = (id, username, password, role) => {
	return apiClient.put('/user', { id, username, password, role }, {
		headers: {
			...getHeaders(),
		}
	})
}

export const deleteusuario = (id) => {
	return apiClient.delete('/user/' + id, {
		headers: {
			...getHeaders(),
		}
	})
}
export const createHorario = (cursoId, events, eventList, time) => {
	return apiClient.post('/horario', { cursoId, events, eventList, time }, {
		headers: {
			...getHeaders(),
		}
	})
}
export const getHorarioById = (id) => {
	return apiClient.get('/horario/' + id, {
		headers: {
			...getHeaders(),
		}
	})
}
export const getAllHorarios = () => {
	return apiClient.get('/horario', {
		headers: {
			...getHeaders(),
		}
	})
}

export const deleteHorario = (id) => {
	return apiClient.delete('/horario/' + id, {
		headers: {
			...getHeaders(),
		}
	})
}

export const saveHorario = (id, info) => {
	return apiClient.put('/horario', { id, info }, {
		headers: {
			...getHeaders(),
		}
	})
}
export const updateTurno = (semana, dia, turno, info) => {
	return apiClient.put('/turno', { semana, dia, turno, info }, {
		headers: {
			...getHeaders(),
		}
	})
}
export const createEvent = (event, formData) => {
	return apiClient.post('/event', { event, formData }, {
		headers: {
			...getHeaders(),
		}
	})
}
export const deleteEvent = (event) => {
	return apiClient.delete('/event', { params: { id: event } }, {
		headers: {
			...getHeaders(),
		}
	})
}
export const createCurso = (data) => {
	return apiClient.post('/curso', data, {
		headers: {
			...getHeaders(),
		}
	})
}
export const updateCurso = (id, data) => {
	return apiClient.put('/curso', { id, data }, {
		headers: {
			...getHeaders(),
		}
	})
}
import { apiClient, getHeaders } from './index'
export const updateProfesor = (id, name) => {
	return apiClient.put("/profesor", { id, nombre: name }, {
		headers: {
			...getHeaders(),
		}
	})
}
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

export const getAllAsignaturasBy = (anno, semestre, carrera) => {
	return apiClient.get('/getAsignaturaByCarrera', {
		params: {
			anno,
			semestre,
			carrera
		},
		headers: {
			...getHeaders(),
		}
	})
}
export const deleteAsignatura = (ids) => {
	return apiClient.post('/asignaProfCurso/deleteBulk', { ids }, {
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

export const createNewAsignaturaForCurso = (asignName, profesorId, frecuency, { carrera, anno, semestre }) => {
	return apiClient.post('/asignatura', { asignName, profesorId, frecuency, carrera, anno, semestre }, {

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
export const createHorario = (formData) => {
	console.log(formData)
	return apiClient.post('/horario', { ...formData }, {
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
import { apiClient, getHeaders } from './index'
export const updateProfesor = (id, name) => {
	console.log('update')
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
	return apiClient.put('/asignatura', { asignProfId: id, profesor,frecuency }, {
		headers: {
			...getHeaders(),
		}
	})
}

export const createNewAsignaturaForCurso = (asignName, profesorId, frecuency, { carrera, anno, semestre }) => {
	return apiClient.post('/asignatura', { asignName, profesorId, frecuency, carrera, anno, semestre }, {
		headers: {
			...getHeaders(),
		}
	})
}
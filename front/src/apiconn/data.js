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
	return apiClient.post('/profesor',  { nombre: name },{
		headers: {
			...getHeaders(),
		}
	})
}

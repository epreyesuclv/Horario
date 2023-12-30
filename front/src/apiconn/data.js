import { apiClient, getHeaders } from './index'
export const updateProfesor = (id, name) => {
	return apiClient.put("/profesor", { id, name }, {
		headers: {
			...getHeaders(),
		}
	})
}
export const deleteProfesor = (id) => { 
	return apiClient.delete('/profesor', { id }, {
		headers: {
			...getHeaders(),
		}
	})
}


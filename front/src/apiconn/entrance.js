import { apiClient, getHeaders } from './index'
export const login = (username, password) => {
	return apiClient.post("/login", { username: username, password }, {
		headers: {
			...getHeaders(),
		}
	})
}


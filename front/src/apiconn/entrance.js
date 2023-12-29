import axios from "axios"
export const login = (username, password) => {
	return axios.post("http://localhost:8080/login", { username: username, password })
}


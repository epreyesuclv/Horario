import axios from "axios"
export const login = (username, password) => {
	return axios.put("http://localhost:1337/api/v1/entrance/login", { emailAddress: username, password })
}



import axios from 'axios'
export const apiClient = axios.create({
	baseURLs: "http://localhost/1337/api/v1",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

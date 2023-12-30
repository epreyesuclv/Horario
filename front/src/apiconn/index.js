
import axios from 'axios'
import jsCookie from 'js-cookie';
export const getHeaders = () => ({

	Accept: "application/json",
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
	"Authorization-user": jsCookie.get('username') || "",
	"Authorization-password": jsCookie.get('password') || ""

})
export const apiClient = axios.create({
	baseURL: "http://localhost:8080",

});

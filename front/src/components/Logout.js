import jsCookie from "js-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export function Logout() {
	const navigate = useNavigate()
	useEffect(() => {
		jsCookie.remove('username')
		jsCookie.remove('password')
		navigate('/')
	})
	return (
		<div></div>
	)
}
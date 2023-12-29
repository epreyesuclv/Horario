import { Input } from "@mui/material"
import "../styles/login_style.css"
import "../styles/pagina_principal_style.css"
import { useState } from "react"
import { login } from "../apiconn/entrance"
import Cookie from 'js-cookie'
import { useNavigate } from "react-router"
export function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)
	const navigate = useNavigate()
	const handleLogin = (event) => {
		event.preventDefault()
		login(email, password).then(value => {
			Cookie.set('username', email)
			Cookie.set('token', password)
			navigate("/home")
		}).catch(err => {
			setError(true)
		})
	}
	return (
		<div className="formulario pt-5 pb-5">
			<h1 className="text-center">Inicio de sesión</h1>
			<div style={{ maxWidth: "450px" }} className="mx-auto">
				<form onSubmit={handleLogin}>
					<div className="form-group username">
						<Input onChange={(value) => {
							setError(false)
							setEmail(value.target.value)
						}} value={email} type="text" className="form-control" error={error} placeholder="Nombre de usuario" autocomplete="email" focus-first />
					</div>
					<div className="form-group username">
						<Input onChange={(value) => {
							setError(false)
							setPassword(value.target.value)
						}} value={password} type="password" error={error} className="form-control" placeholder="Contraseña" autocomplete="current-password" />
					</div>

					<div className="form-group" style={{ marginBottom: "10px" }}>
						<button className="btn-login">Registro</button>
					</div>
				</form>
			</div>
		</div>
	)
}
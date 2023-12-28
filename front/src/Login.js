import { Input } from "@mui/material"
import "./styles/login_style.css"
import "./styles/pagina_principal_style.css"
import { useState } from "react"
import { login } from "./apiconn/entrance"

export function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const handleLogin = () => {
		login(email, password).then(value => {
			console.log(value)
		})
	}
	return (
		<div id="login">
			<div className="formulario container-fluid pt-5 pb-5">
				<h1 className="text-center">Inicio de sesión</h1>
				<div style={{ maxWidth: "450px" }} className="mx-auto">
					<form onSubmit={handleLogin}>
						<div className="form-group username">
							<Input onChange={(value) => setEmail(value.target.value)} value={email} type="email" className="form-control" placeholder="Nombre de usuario" autocomplete="email" focus-first />
						</div>
						<div className="form-group username">
							<Input onChange={(value) => setPassword(value.target.value)} value={password} type="password" className="form-control" placeholder="Contraseña" autocomplete="current-password" />
						</div>

						<div className="form-group" style={{ marginBottom: "10px" }}>
							<button className="btn-login">Registro</button>
						</div>
					</form>
				</div>
			</div>
		</div>)
}
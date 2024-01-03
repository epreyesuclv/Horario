
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/pagina_principal_style.css'
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
export function Home() {
	// const [credentials, setCredentials] = useState({
	// 	username: Cookie.get('username') || "",
	// 	password: Cookie.get('password') || "",
	// })
	// const [logged, setLogged] = useState(false)

	// useEffect(() => {
	// 	if (credentials.username !== "" && credentials.password !== "") {
	// 		setLogged(true)
	// 	}
	// }, [])
	return (
		<div class="container mt-5">
			<h1 class="text-center mb-4">Menu Principal</h1>
			<div class="row mb-4">
				<div class="col-md-6">
					<div class="card h-100 shadow bg-transparent">
						<div class="card-body text-white">
							<h5 class="card-title">Hacer Horario</h5>
							<p class="card-text">Crea un nuevo horario de manera fácil y rápida.</p>
							<a href="/hacer_horario" class="btn btn-primary btn-block">Ir</a>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card h-100 shadow bg-transparent">
						<div class="card-body text-white">
							<h5 class="card-title">Revisar Horario</h5>
							<p class="card-text">Revisa y modifica los horarios existentes con comodidad.</p>
							<a href="/revisar_horario" class="btn btn-primary btn-block">Ir</a>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<div class="card h-100 shadow bg-transparent">
						<div class="card-body text-white">
							<h5 class="card-title">Hacer Horario Especial</h5>
							<p class="card-text">Crea horarios especiales según tus necesidades.</p>
							<a href="/hacer_horario_especial" class="btn btn-primary btn-block">Ir</a>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card h-100 shadow bg-transparent">
						<div class="card-body text-white">
							<h5 class="card-title">Profesores</h5>
							<p class="card-text">Ver y agregar nuevos profesores</p>
							<a href="/agregar_profesor" class="btn btn-primary btn-block">Ir</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
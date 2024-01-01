import { Divider, FormControl, Grid, IconButton, Input, InputLabel, List, ListItem, MenuItem, Select, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { getCarreras, getAllAsignaturasBy, deleteAsignatura, getAllProfesors, changeNameAsignatura, updateAsignatura } from '../apiconn/data'
import { AddCircleOutline, Delete, Edit, Save } from '@mui/icons-material'
import { GridInput } from './GridInput'


export function CreateHorario() {

	const [formData, setFormData] = useState({
		carrera: "",
		anno: "",
		semestre: "",
		semanas: "",
		startDate: new Date()
	})
	const [carreras, setCarreras] = useState([])
	const [asignaturas, setAsignaturas] = useState([{ nombre: "Matematica", frecuency: 0, editable: false, profesor: "dasf" }])
	const [profesores, setProfesores] = useState([])
	const [addNew, setAddNew] = useState(false)
	const [newAsignatura, setNewAsignatura] = useState("")
	const [refresh, setRefresh] = useState(true)
	const [newFrecuency, setNewFrecuency] = useState(0)
	const [newProfesor, setNewProfesor] = useState("")

	const fetchAsignaturas = useCallback(async () => {

		if (formData.carrera !== "" && formData.anno !== "" && formData.semestre !== "") {
			const data = await getAllAsignaturasBy(formData.anno, formData.semestre, formData.carrera)
			setAsignaturas(data.data)
		}

	}, [formData])


	useEffect(() => {
		async function fetch(params) {
			const data = await getAllProfesors()
			setProfesores(data.data)
		}
		fetch()
	}, [])

	useEffect(() => {
		async function fetch() {
			const data = await getCarreras()
			setCarreras(data.data)
		}
		fetch()
	}, [])

	useEffect(() => {
		if (refresh) {
			fetchAsignaturas()
			setRefresh(false)
		}
	}, [fetchAsignaturas, refresh])

	useEffect(() => {
		fetchAsignaturas()
	}, [fetchAsignaturas])

	const handleEdit = (id) => () => {
		const asignatura = asignaturas.find(asignatura => asignatura.id === id)
		if (!asignatura.editable) {
			asignatura.editable = true
			setAsignaturas([...asignaturas])
		} else {
			asignatura.editable = false
			updateAsignatura(asignatura.id, asignatura.nombre, asignatura.profesor)
			setAsignaturas([...asignaturas])
		}
	}

	const handleDelete = (id) => () => {
		const asignatura = asignaturas.find(asignatura => asignatura.id === id)
		if (asignatura.asignProfCurso) {
			deleteAsignatura(asignatura.asignProfCurso.map(asignProfCurso => asignProfCurso.id))
			setRefresh(true)
		}
	}

	const handleOnChangeName = (id) => (event) => {
		const asignatura = asignaturas.find(asignatura => asignatura.id === id)
		asignatura.nombre = event.target.value
		setAsignaturas([...asignaturas])
	}
	const handleOnChangeFrecuency = (id) => (event) => {
		const asignatura = asignaturas.find(asignatura => asignatura.id === id)
		asignatura.frecuency = event.target.value
		setAsignaturas([...asignaturas])
	}

	const handleOnChangeProfesor = (id) => (event) => {
		const asignatura = asignaturas.find(asignatura => asignatura.id === id)
		asignatura.profesor = event.target.value
		setAsignaturas([...asignaturas])
	}

	const handleOnChangeNameNew = (event) => {
		setNewAsignatura(event.target.value)
	}
	const handleOnChangeFrecuencyNew = (event) => {
		setNewFrecuency(event.target.value)
	}

	const handleOnChangeProfesorNew = (event) => {
		setNewProfesor(event.target.value)
	}
	const handleChange = (name) => (value) => {
		setFormData(data => ({ ...data, [name]: value.target.value }))
		// switch (name) {
		// 	case 'carrera':

		// 		break;

		// 	default:
		// 		break;
		// }
		console.log(formData)
	}

	const handleCreate = () => {

	}

	return (
		<div className="container-fluid">
			<form>
				<Grid container spacing={3} my={"50px"}>
					<Grid item xs={6}>
						<FormControl fullWidth>
							<InputLabel id="carrera-selector">Carrera</InputLabel>
							<Select
								id="carrera-selector"
								required
								fullWidth
								label="Carrera"
								onChange={handleChange('carrera')}
								placeholder='Carrera'
								value={formData.carrera}
							>{
									carreras.map(value => (<MenuItem key={value.id} value={value.id}>
										{value.nombre}
									</MenuItem>))
								}

							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl fullWidth>
							<InputLabel id="anno-selector">Anno</InputLabel>
							<Select
								id="anno-selector"
								required
								fullWidth
								onChange={handleChange('anno')}
								label="Anno"
								placeholder='Anno'
								value={formData.anno}
							>{
									[1, 2, 3, 4, 5].map(value => (<MenuItem key={value} value={value}>
										{value}
									</MenuItem>))
								}

							</Select>
						</FormControl>

					</Grid>
					<Grid item xs={6}>
						<FormControl fullWidth>
							<InputLabel id="semestre-selector">semestre</InputLabel>
							<Select
								id="semestre-selector"
								required
								onChange={handleChange('semestre')}
								fullWidth
								label="semestre"
								placeholder='semestre'
								value={formData.semestre}
							>{
									[1, 2].map(value => (<MenuItem key={value} value={value}>
										{value}
									</MenuItem>))
								}

							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3}>
						<FormControl fullWidth>
							<InputLabel id="startDate-semanas">Fecha inicio</InputLabel>
							<Input
								id='startDate-semanas'
								required
								fullWidth
								onChange={handleChange('startDate')}
								type='date'
								value={formData.startDate}
							>

							</Input>
						</FormControl>
					</Grid>
					<Grid item xs={3}>
						<FormControl fullWidth>
							<InputLabel id="cantidad-semanas">Semanas</InputLabel>
							<Input
								id="cantidad-semanas"
								required
								fullWidth
								onChange={handleChange('semanas')}
								type='number'
								label="semanas"
								placeholder='semanas'
								value={formData.semanas}
							>

							</Input>
						</FormControl>
					</Grid>
					<Grid item xs={12}><Divider ></Divider></Grid>
					<Grid item xs={12}><Typography variant='h3' textAlign={'center'}>Asignaturas</Typography></Grid>
					<Grid item xs={10} marginLeft={"30px"} justifyContent={'center'}>
						<List dense={true}>
							{asignaturas.map((value) => (
								<ListItem
									key={value.id}
									secondaryAction={
										<div>
											<IconButton onClick={handleEdit(value.id)} edge="end" aria-label="edit" sx={{ marginRight: '10px' }}>
												{value.editable ? <Save></Save> : <Edit />}
											</IconButton>
											<IconButton onClick={handleDelete(value.id)} edge="end" aria-label="delete">
												<Delete />
											</IconButton>
										</div>

									}
								>
									<Grid container spacing={3}>
										<GridInput onChange={handleOnChangeName(value.id)} xs={3} value={value.nombre} disabled></GridInput>
										<GridInput
											disabled={!value.editable}
											label='Horas Clase'
											xs={4}
											value={value.frecuency}
											onChange={handleOnChangeFrecuency(value.id)}>
										</GridInput>
										<Grid item xs={4}>
											<FormControl fullWidth>
												<InputLabel id={'id-profesor-' + value.id}>Profesor</InputLabel>
												<Select
													disabled={!value.editable}
													fullWidth
													id={'id-profesor-' + value.id}
													label="Profesor"
													placeholder='Profesor'
													value={value.profesor}
													onChange={handleOnChangeProfesor(value.id)}>
													{
														profesores.map(value => {
															return (
																<MenuItem key={value.id} value={value.id}>
																	{value.nombre}
																</MenuItem>
															)
														})
													}
												</Select>
											</FormControl>

										</Grid>
									</Grid>
								</ListItem>
							))
							}
							<ListItem key={'new'} sx={{ justifyContent: 'center' }}>
								{addNew ?
									<Grid container spacing={3}>
										<GridInput
											label='Asignatura'
											type="number"
											xs={4}
											value={newAsignatura}
											onChange={handleOnChangeNameNew}>
										</GridInput>
										<GridInput
											label='Horas Clase'
											xs={4}
											value={newFrecuency}
											onChange={handleOnChangeFrecuencyNew}>
										</GridInput>
										<Grid item xs={4}>
											<Select
												value={newProfesor}
												onChange={handleOnChangeProfesorNew}>
												{
													profesores.map(value => {
														return (
															<MenuItem key={value.id} value={value.id}>
																{value.nombre}
															</MenuItem>
														)
													})
												}
											</Select>
										</Grid>
										<IconButton onClick={handleCreate} >
											<Save></Save>
										</IconButton>
									</Grid> :
									<IconButton onClick={() => setAddNew(true)} edge="end" aria-label="delete">
										<AddCircleOutline />
									</IconButton>}
							</ListItem>
						</List>
					</Grid>
				</Grid>
			</form>
		</div >
	)
}
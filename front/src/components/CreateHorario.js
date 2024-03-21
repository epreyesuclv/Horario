import { Button, Divider, FormControl, Grid, IconButton, Input, InputLabel, List, ListItem, MenuItem, Select, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { getCarreras, getAllAsignaturasBy, deleteAsignatura, getAllProfesors, updateAsignatura, createNewAsignaturaForCurso, createHorario, createEvent, deleteEvent, createCurso, updateCurso } from '../apiconn/data'
import { AddCircleOutline, Delete, Edit, Save } from '@mui/icons-material'
import { GridInput } from './GridInput'
import AddIcon from '@mui/icons-material/Add';
import { EditWeekHorario } from './EditWeekHorario'
import moment from 'moment'

const horarioData = [{
	num: 1,
	semana: [
		["-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-"],
	]
},
{
	num: 2,
	semana: [
		["-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-"],
		["-", "-", "-", "-", "-", "-"],
	]
}]

export function CreateHorario() {

	const [formData, setFormData] = useState({
		carrera: "",
		anno: "",
		semestre: "",
		time: "",
		semanas: "",
		startDate: new Date(),
		finishDate: new Date(),
	})
	const [eventList, setEventList] = useState([])
	const [events, setEvents] = useState(horarioData)
	const [curso, setCurso] = useState()
	const [carreras, setCarreras] = useState([])
	const [asignaturas, setAsignaturas] = useState([])
	const [profesores, setProfesores] = useState([])
	const [addNew, setAddNew] = useState(false)
	const [newAsignatura, setNewAsignatura] = useState("")
	const [refresh, setRefresh] = useState(true)
	const [newFrecuency, setNewFrecuency] = useState(0)
	const [newProfesor, setNewProfesor] = useState("")
	const [step, setStep] = useState(0)
	const [newEvent, setNewEvent] = useState()
	const [addNewEvent, setAddNewEvent] = useState()

	const fetchAsignaturas = useCallback(async () => {
		if (curso) {
			const data = await getAllAsignaturasBy(curso)
			console.log(data)
			setAsignaturas(data.data.map(value => ({
				nombre: value.nombre,
				frecuency: value.asignProfCursos[0].frecuency,
				editable: false,
				profesor: value.asignProfCursos[0].profesorId,
				...value
			})))
			// getAllEventsBy(formData.carrera, formData.anno)
		}

	}, [curso])
	const handleDisableNextButton = () => {

		return !(step === 0 && (formData.carrera !== "" && formData.anno !== "" && formData.semestre !== "" && formData.time !==""))
	}
	useEffect(() => {
		if (formData.semanas) {
			// generate <semanas> data
			const data = []
			for (let i = 0; i < formData.semanas; i++) {
				data.push({
					num: i + 1,
					semana: [
						["-", "-", "-", "-", "-", "-"],
						["-", "-", "-", "-", "-", "-"],
						["-", "-", "-", "-", "-", "-"],
						["-", "-", "-", "-", "-", "-"],
						["-", "-", "-", "-", "-", "-"],
					]
				})
			}
			setEvents(data)
		}
	}, [formData])

	useEffect(() => {
		async function fetch() {
			const data = await getAllProfesors()
			setProfesores(data.data)
			const data2 = await getCarreras()
			setCarreras(data2.data)
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
	}, [curso, fetchAsignaturas])

	const handleCreateCurso = () => {
		createCurso(formData).then((value) => {
			setCurso(value.data)
		})
	}

	const handleEdit = (id) => () => {
		const asignatura = asignaturas.find(asignatura => asignatura.id === id)
		if (!asignatura.editable) {
			asignatura.editable = true
			setAsignaturas([...asignaturas])
		} else {
			console.log(asignatura)
			asignatura.editable = false
			updateAsignatura(asignatura.asignProfCursos[0].id, asignatura.profesor, asignatura.frecuency)
			setAsignaturas([...asignaturas])
		}
	}

	const handleDelete = (id) => () => {
		const asignatura = asignaturas.find(asignatura => asignatura.id === id)
		if (asignatura.asignProfCursos) {
			deleteAsignatura(asignatura.asignProfCursos.map(asignProfCurso => asignProfCurso.id))
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
	}

	const handleCreate = () => {
		createNewAsignaturaForCurso(newAsignatura, newProfesor, newFrecuency, formData).then(() => setRefresh(true))
		handleDeleteNew()
	}

	const handleDeleteNew = () => {
		setNewAsignatura("")
		setNewFrecuency("")
		setNewProfesor("")
		setAddNew("")
	}

	const handleGenerateHorario = () => {
		createHorario(formData).then(value => {
			window.location.href = '/revisar_horario/' + value.data.horario
		})
	}

	const step0 = () => {
		return <Grid container spacing={3} my={"40px"}>
			<Grid item xs={12} style={{ textAlign: "center" }}><Typography variant='h3'>Curso</Typography></Grid>
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
					<InputLabel id="anno-selector">Año</InputLabel>
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
					<InputLabel id="time-selector">Horario</InputLabel>
					<Select
						id="time-selector"
						required
						fullWidth
						onChange={handleChange('time')}
						label="Horario"
						placeholder='Horario'
						value={formData.time}
					>{
							['Mañana', 'Tarde'].map(value => (<MenuItem key={value} value={value}>
								{value}
							</MenuItem>))
						}

					</Select>
				</FormControl>

			</Grid>
			<Grid item xs={6}>
				<FormControl fullWidth>
					<InputLabel id="semestre-selector">Semestre</InputLabel>
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
			<Grid item xs={12}><Divider ></Divider></Grid>
			<Grid item xs={6}>
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
			<Grid item xs={6}>
				<FormControl fullWidth>
					<InputLabel id="finishDate-semanas">Fecha Fin</InputLabel>
					<Input
						id='finishDate-semanas'
						required
						fullWidth
						onChange={handleChange('finishDate')}
						type='date'
						value={formData.finishDate}
					>
					</Input>
				</FormControl>
			</Grid>
		</Grid>
	}

	const handleDeleteEvent = (id) => () => {
		deleteEvent(id)
	}

	const handleOnChangeNewEvent = (name) => (e) => {
		setNewEvent(value => ({ ...value, [name]: e.target.value }))
	}

	const handleCreateEvent = () => {
		createEvent(newEvent, { anno: formData.anno, carrera: formData.carrera, semestre: formData.semestre }).then(value => {
			setAddNewEvent(false)
		})
	}
	const handleEditDate = () => {
		updateCurso(curso, { inicio: formData.startDate, fin: formData.finishDate })
	}

	const step1 = () => {
		const semanas = moment(formData.finishDate).diff(moment(formData.startDate), 'weeks') + 1
		if (semanas !== formData.semanas)
			setFormData(data => ({ ...data, semanas }))
		console.log(events)
		return <form style={{ marginRight: "30px", marginLeft: "30px" }}>
			<Grid container spacing={5} my={"10px"}>
				<Grid item xs={12}>
					<Typography style={{ textAlign: 'center' }} variant='h3'>Configuración de eventos</Typography>
				</Grid>
				<EditWeekHorario
					horario={events}
					setHorario={setEvents}
					selector={["-", "*"]}
					handleSave={setEvents}
					amountSemanas={semanas}
					fechaInicio={formData.startDate}
				/>
				<Grid item xs={12}>
					<Typography textAlign="center" variant='h4'>Eventos</Typography>
					<List dense>
						{eventList.map(value => (
							<ListItem
								key={value.id}
								secondaryAction={<div>
									<IconButton onClick={handleDeleteEvent(value.id)} edge="end" aria-label="delete">
										<Delete />
									</IconButton>
								</div>}
							>

							</ListItem>))}
						<ListItem sx={{ justifyContent: 'center' }}>
							{addNewEvent ?
								<div>
									<Input onChange={handleOnChangeNewEvent('description')} variant="body2"
										primary="Single-line item"
										value={newEvent?.description}
									>
									</Input>
									<Input onChange={handleOnChangeNewEvent('date')} variant="body2"
										primary="Single-line item"
										type='date'
										value={newEvent?.date}
									>
									</Input>
									<Input onChange={handleOnChangeNewEvent('date')} variant="body2"
										primary="Single-line item"
										type='date'
										value={newEvent?.date}
									>
									</Input>
									<IconButton onClick={handleCreateEvent} >
										<Save></Save>
									</IconButton>
									< IconButton onClick={handleDeleteEvent}></IconButton>
								</div> :
								<IconButton onClick={() => setAddNewEvent(true)} edge="end" aria-label="delete">
									<AddIcon />
								</IconButton>
							}
						</ListItem>
					</List>
				</Grid>
			</Grid>
		</form>
	}

	const step2 = () => {
		return <form>
			<Grid container spacing={3} my={"50px"} style={{ justifyContent: 'center' }}>
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
										xs={3}
										value={value.frecuency}
										onChange={handleOnChangeFrecuency(value.id)}>
									</GridInput>
									<Grid item xs={3}>
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
						<ListItem
							secondaryAction={
								addNew ? <div>
									<IconButton onClick={handleCreate} edge="end" aria-label="edit" sx={{ marginRight: '10px' }}>
										<Save></Save>
									</IconButton>
									<IconButton onClick={handleDeleteNew} edge="end" aria-label="delete">
										<Delete />
									</IconButton>
								</div> : null

							}
							key={'new'}
							sx={{ justifyContent: 'center' }}>
							{addNew ?
								<Grid container item xs={12} spacing={3}>
									<GridInput
										label='Asignatura'
										type="text"
										xs={3}
										value={newAsignatura}
										onChange={handleOnChangeNameNew}>
									</GridInput>
									<GridInput
										label='Horas Clase'
										xs={3}
										value={newFrecuency}
										onChange={handleOnChangeFrecuencyNew}>
									</GridInput>
									<Grid item xs={3}>
										<FormControl fullWidth>
											<InputLabel id={'id-profesor-new'}>Profesor</InputLabel>
											<Select
												label='Profesor'
												placeholder='Profesor'
												autoWidth
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
										</FormControl>
									</Grid>
								</Grid> :
								<IconButton hidden={!formData.anno || !formData.carrera || !formData.semestre} onClick={() => setAddNew(true)} edge="end" aria-label="delete">
									<AddCircleOutline />
								</IconButton>}
						</ListItem>
						<ListItem hidden={!formData.anno || !formData.carrera || !formData.semestre} sx={{ justifyContent: 'center' }}>
							<Button disabled={!formData.anno || !formData.carrera || !formData.semestre || !formData.semanas > 0} onClick={handleGenerateHorario} sx={{ margin: "20px" }}>Generar Horario</Button>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		</form>
	}

	const nextStep = () => {
		if (step === 0)
			handleCreateCurso()
		if (step === 1)
			handleEditDate()
		setStep(value => value + 1)

	}
	const previousStep = () => {
		setStep(value => value - 1)
	}
	const currentStep = () => {
		if (step === 0)
			return step0()
		if (step === 1)
			return step1()
		if (step === 2)
			return step2()

	}
	return (
		<div className="container-fluid">
			{currentStep()}
			<div className='flex'>
			</div>
			<div class=" text-right mr-3 " style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
				<Button style={{ margin: "20px", fontSize: "x-small" }} variant='contained' onClick={previousStep} >previous</Button>
				<a href="/home" class=" btn btn-secondary">Regresar al Home</a>
				<Button style={{ margin: "20px", fontSize: "x-small" }} variant='contained' onClick={nextStep} disabled={handleDisableNextButton()}>next</Button>

			</div>
		</div >
	)
}
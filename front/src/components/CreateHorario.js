import { Button, Divider, FormControl, Grid, IconButton, Input, InputLabel, List, ListItem, MenuItem, Select, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { getCarreras, getAllAsignaturasBy, deleteAsignatura, getAllProfesors, updateAsignatura, createNewAsignaturaForCurso, createHorario, createEvent, deleteEvent, createCurso, updateCurso } from '../apiconn/data'
import { AddCircleOutline, Delete, Edit, Save } from '@mui/icons-material'
import { GridInput } from './GridInput'
import AddIcon from '@mui/icons-material/Add';
import { EditWeekHorario } from './EditWeekHorario'
import moment from 'moment'
import { DatePicker } from '@mui/x-date-pickers';
import { disableDay } from '../utils'

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
		startDate: moment().add(1, 'week').weekday(1),
		finishDate: moment().add(10, 'week').weekday(1),
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
	const [totalTurnos, setTotalTurnos] = useState(0)
	const [turnosDisponibles, setTurnosDisponibles] = useState(0)
	const [percent, setPercent] = useState(10)

	const fetchAsignaturas = useCallback(async () => {
		if (curso) {
			const data = await getAllAsignaturasBy(curso)
			setAsignaturas(data.data.map(value => ({
				nombre: value.asignatura.nombre,
				frecuency: value.frecuency,
				editable: false,
				profesor: value.profesorId,
				...value
			})))
		}

	}, [curso])

	const handleDisableNextButton = () => {
		return !((step === 0 && (formData.carrera !== "" && formData.anno !== "" && formData.semestre !== "" && formData.time !== "")) || (step === 1))
	}

	const handleDisablePreviousButton = () => {
		return (step === 0)
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

	useEffect(() => {
		if (formData.finishDate && formData.startDate)
			setTotalTurnos((moment(formData.finishDate).diff(formData.startDate, 'week') + 1) * 15)
	}, [formData])

	useEffect(() => {
		let turnosDisp = 0
		events.forEach(event => {
			event.semana.forEach(semana => {
				semana.forEach((turno, index) => {
					if (formData.time === "Mañana") {
						if (index < 3 && turno === "-") {
							turnosDisp++
						}
					}
					else {
						if (index >= 3 && turno === "-") {
							turnosDisp++
						}
					}

				})
			})
		})
		asignaturas.forEach(asignatura => {
			turnosDisp -= asignatura.frecuency / 2
		})
		setTurnosDisponibles(turnosDisp)
	}, [events, asignaturas, formData.time])

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
			asignatura.editable = false
			updateAsignatura(asignatura.id, asignatura.profesor, asignatura.frecuency)
			setAsignaturas([...asignaturas])
		}
	}

	const handleDelete = (id) => () => {
		deleteAsignatura(id)
		setRefresh(true)
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
		createHorario(formData, { events, eventList }).then(value => {
			window.location.href = '/revisar_horario/' + value.data.horario
		})
	}


	const step0 = () => {
		return <Grid container spacing={3} style={{ padding: "70px" }}>
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
				<DatePicker
					id='startDate-semanas'
					label="Fecha de Inicio"
					fullWidth
					onChange={(date) => setFormData(value => ({ ...value, startDate: date }))}
					value={formData.startDate}
					shouldDisableDate={disableDay}

				>
				</DatePicker>
			</Grid>
			<Grid item xs={6}>
				<DatePicker
					id='finishDate-semanas'
					label="Fecha de Fin"
					fullWidth
					onChange={(date) => setFormData(value => ({ ...value, finishDate: date }))}
					value={formData.finishDate}
					shouldDisableDate={disableDay}
				>
				</DatePicker>
			</Grid>
		</Grid>
	}

	const handleDeleteEvent = (id) => () => {
		setEventList(list => list.filter((_, index) => index !== id))
	}
	const handleDeleteNewEvent = () => {
		setNewEvent("")
		setAddNewEvent(false)
	}

	const handleCreateEvent = () => {
		setEventList(list => [...list, newEvent])
		setAddNewEvent(false)

	}

	const handleReducePercent = () => {
		// updateAsignatura(asignatura.asignProfCursos[0].id, asignatura.profesor, asignatura.frecuency)
		// setAsignaturas([...asignaturas])
		asignaturas.forEach(asign => {
			asign.frecuency = parseInt(asign.frecuency - asign.frecuency * percent / 100)
			updateAsignatura(asign.id, asign.profesor, asign.frecuency)
		})
		setAsignaturas([...asignaturas])
	}
	const step1 = () => {
		const semanas = moment(formData.finishDate).diff(moment(formData.startDate), 'weeks') + 1
		if (semanas !== formData.semanas)
			setFormData(data => ({ ...data, semanas }))
		console.log("event lIst", eventList)
		return <form style={{ marginRight: "30px", marginLeft: "30px" }}>
			<Grid container spacing={5} my={"10px"}>
				<Grid item xs={12}>
					<Typography style={{ textAlign: 'center' }} variant='h3'>Configuración de eventos</Typography>
				</Grid>
				<EditWeekHorario
					horario={events}
					setHorario={setEvents}
					selector={["-", "SC", ...eventList.map((_, index) => index)]}
					amountSemanas={semanas}
					fechaInicio={formData.startDate}
				/>
				<Grid item xs={12}>
					<Divider />
					<Typography textAlign="center" variant='h4'>Eventos</Typography>
					<Divider />
					<div style={{ display: 'flex', maxWidth: "auto", justifyContent: "center" }}>
						<List dense style={{ maxWidth: "400px" }}>
							{eventList.map((value, index) => (
								<ListItem
									key={index}
									secondaryAction={<div>
										<IconButton onClick={handleDeleteEvent(index)} edge="end" aria-label="delete">
											<Delete />
										</IconButton>
									</div>}
								>
									{index + " : " + value}
								</ListItem>))}
							<ListItem sx={{ justifyContent: 'center' }}>
								{addNewEvent ?
									<div>
										<Input onChange={(e) => setNewEvent(e.target.value)} variant="body2"
											primary="Single-line item"
											value={newEvent}
											style={{ margin: "10px" }}
										>
										</Input>
										<IconButton onClick={handleCreateEvent} >
											<Save></Save>
										</IconButton>
										< IconButton onClick={handleDeleteNewEvent}>
											<Delete />
										</IconButton>
									</div> :
									<IconButton onClick={() => setAddNewEvent(true)} edge="end" aria-label="delete">
										<AddIcon />
									</IconButton>
								}
							</ListItem>
						</List>
					</div>

				</Grid>
			</Grid>
		</form>
	}

	const step2 = () => {
		return <form>
			<Grid container spacing={3} my={"50px"} style={{ justifyContent: 'center' }}>
				<Grid item xs={4}><Typography variant='h3' textAlign={'center'}>Asignaturas</Typography></Grid>
				<Grid item container xs={4}>
					<Grid item xs={12}>{"Total de turnos disponible : " + turnosDisponibles}</Grid>
					<Grid item xs={12}>{"Total de turnos : " + totalTurnos}</Grid>
				</Grid>
				<Grid visibility={turnosDisponibles >= 0 ? "hidden" : "visible"} item xs={2} style={{ textAlign: 'center' }}>
					<FormControl style={{ minWidth: "100px" }}>
						<InputLabel id="time-selector">Porciento</InputLabel>
						<Select
							id="percent-selector"
							required
							fullWidth
							onChange={(event) => { setPercent(event.target.value) }}
							label="percent"
							placeholder='Porciento'
							value={percent}
						>{
								[10, 11, 12, 13, 14, 15].map(value => (<MenuItem key={value} value={value}>
									{value + "%"}
								</MenuItem>))
							}

						</Select>
					</FormControl>
				</Grid>
				<Grid item visibility={turnosDisponibles >= 0 ? "hidden" : "visible"} xs={2}>
					<Button onClick={handleReducePercent} variant='contained'>Reducir</Button>
				</Grid>
				<Grid item ></Grid>
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
							<Button disabled={turnosDisponibles < 0} onClick={handleGenerateHorario} sx={{ margin: "20px" }}>Generar Horario</Button>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		</form >
	}

	const nextStep = () => {
		if (step === 0) {
			handleCreateCurso()
			setStep(value => value + 1)
		}

		if (step === 1)
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
				<Button style={{ margin: "20px", fontSize: "x-small" }} variant='contained' onClick={previousStep} disabled={handleDisablePreviousButton()}>previous</Button>
				<a style={{ fontSize: "large" }} href="/home" class=" btn btn-secondary">Regresar al Home</a>
				<Button style={{ margin: "20px", fontSize: "x-small" }} variant='contained' onClick={nextStep} disabled={handleDisableNextButton()}>next</Button>

			</div>
		</div >
	)
}
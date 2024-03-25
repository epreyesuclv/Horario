import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import moment from 'moment'
import '../styles/revisar_horario_style.css'

import { useParams } from "react-router-dom";
import { getHorarioById, saveHorario, updateTurno } from "../apiconn/data";
import { EditWeekHorario } from "./EditWeekHorario";
const horarioData = {
	amountSemanas: 2,
	fechaInicio: moment(),
	asignaturas: [],
	horario: [{
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
}
export function CheckHorario() {
	const params = useParams()
	const [horario, setHorario] = useState(horarioData)

	useEffect(() => {
		async function fetch() {
			const data = await getHorarioById(params.id)
			if (typeof data.data === 'string') setHorario(JSON.parse(data.data))
			else setHorario(data.data)

		}
		fetch()
	}, [params])

	const setMapHorario = (value) => {
		setHorario(valueH => {
			return { ...valueH, horario: value }
		})
		saveHorario(params.id, horario)

	}
	const registerChange = (semana, dia, turno, info) => {
		updateTurno(semana, dia, turno, horario.asignaturas.find(value => value.index === info).id)
	}

	const options = horario.asignaturas.map(value => value.index)
	options.push("-")
	console.log(horario)
	return (
		<Grid style={{ maxWidth: "fit-content" }} margin={"30px"} container spacing={3}>
			<Grid item xs={12}>
				<EditWeekHorario
					horario={horario.horario}
					setHorario={setMapHorario}
					selector={options}
					amountSemanas={horario.amountSemanas}
					fechaInicio={horario.fechaInicio}
					extraUpdate={registerChange}
				></EditWeekHorario>
			</Grid>
			<Grid my={5} item xs={6}>
				<Typography variant="h3">Leyenda de asignaturas</Typography>
				{horario.asignaturas.map(value => (<Typography mx={2} my={2}>{value.index + " : " + value.nombre + " ( " + value.profesor?.nombre + " )"}</Typography>))}
			</Grid>
			<Grid my={5} item xs={6}>
				<Typography variant="h3">Leyenda de eventos</Typography>
				{horario.eventList?.map((value, index) => (<Typography mx={2} my={2}>{index + " : " + value}</Typography>))}
			</Grid>
			<div class="fixed-bottom text-right mr-3 mb-3" style={{ textAlign: 'center' }}>
				<a href="/home" class="btn btn-secondary">Regresar al Home</a>
			</div>
		</Grid >
	)
}
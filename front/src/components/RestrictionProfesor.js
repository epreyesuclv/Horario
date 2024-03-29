import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import moment from 'moment'
import '../styles/revisar_horario_style.css'

import { useParams } from "react-router-dom";
import { getHorarioById, getProfesor, saveHorario, updateProfesor } from "../apiconn/data";
import { EditWeekHorario } from "./EditWeekHorario";
import { DatePicker } from "@mui/x-date-pickers";
import { disableDay } from "../utils";
const horarioData = {
	startDate: moment().add(1, 'week').weekday(1).startOf('day'),
	finishDate: moment().add(2, 'week').weekday(1).startOf('day'),
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

export function RestrictionProfesor() {
	const params = useParams()
	const [restriction, setRestriction] = useState(horarioData)
	const [asignaturas, setAsignaturas] = useState([])

	useEffect(() => {
		async function fetch() {
			const { data } = await getProfesor(params.id)
			setAsignaturas(data.asignaturas)
			if (data.prof.restricciones)
				setRestriction({
					...data.prof.restricciones,
					startDate: moment(data.prof.restricciones.startDate),
					finishDate: moment(data.prof.restricciones.finishDate)
				})

		}
		fetch()
	}, [params])

	useEffect(() => {
		setRestriction(previous => {
			const semanas = moment(previous.finishDate).diff(moment(previous.startDate), 'weeks') + 1
			if (semanas < previous.horario.length)
				return ({
					...previous,
					horario: previous.horario.splice(semanas, previous.horario.length + 1 - semanas)
				})
			else {
				const toPush = []
				for (let i = previous.horario.length + 1; i <= semanas; i++) {
					const data = {
						num: i,
						semana: [
							["-", "-", "-", "-", "-", "-"],
							["-", "-", "-", "-", "-", "-"],
							["-", "-", "-", "-", "-", "-"],
							["-", "-", "-", "-", "-", "-"],
							["-", "-", "-", "-", "-", "-"],
						]
					}
					toPush.push(data)
				}

				previous.horario.push(...toPush)
				return previous
			}
		})
	}, [restriction.finishDate, restriction.startDate])

	const handleSave = () => {
		updateProfesor(params.id, null, restriction)
	}
	const setMapHorario = (value) => {
		setRestriction(valueH => {
			return { ...valueH, horario: value }
		})
	}



	const options = ['-', 'SC']
	asignaturas.forEach(value => {
		options.push(value.id)
	})
	const amountSemanas = moment(restriction.finishDate).diff(moment(restriction.startDate), 'weeks') + 1
	let disabled = false
	if (asignaturas.length > 0)
		disabled = true

	return (
		<Grid style={{ maxWidth: "fit-content" }} margin={"30px"} container spacing={3}>
			<Grid item xs={6}>
				<DatePicker
					id='startDate-semanas'
					label="Fecha de Inicio"
					fullWidth
					onChange={(date) => setRestriction(value => ({ ...value, startDate: date }))}
					value={restriction.startDate}
					shouldDisableDate={disableDay}

				>
				</DatePicker>
			</Grid>
			<Grid item xs={6}>
				<DatePicker
					id='finishDate-semanas'
					label="Fecha de Fin"
					fullWidth
					onChange={(date) => setRestriction(value => ({ ...value, finishDate: date }))}
					value={restriction.finishDate}
					shouldDisableDate={disableDay}
				>
				</DatePicker>
			</Grid>
			<Grid item xs={12}>
				<EditWeekHorario
					disabled={disabled}
					horario={restriction.horario}
					setHorario={setMapHorario}
					selector={options}
					amountSemanas={amountSemanas}
					fechaInicio={restriction.fechaInicio}
					btnSave
					handleSave={handleSave}
				></EditWeekHorario>
			</Grid>
			<Grid my={5} item xs={6}>
				<Typography variant="h3">Leyenda de asignaturas</Typography>
				{asignaturas.map(value => (<Typography mx={2} my={2}>{value.id + " : " + value.nombre}</Typography>))}
			</Grid>
			<div class="fixed-bottom text-right mr-3 mb-3" style={{ textAlign: 'center' }}>
				<a href="/home" class="btn btn-secondary">Regresar al Home</a>
			</div>
		</Grid >
	)
}
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import moment from 'moment'
import '../styles/revisar_horario_style.css'

import { useParams } from "react-router-dom";
import { getHorarioById, saveHorario } from "../apiconn/data";
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

	const handleSave = () => {
		saveHorario(params.id, horario)
	}
	const setMapHorario = (value) => {
		setHorario(valueH => {
			return { ...valueH, horario: value }
		})
	}
	const options = horario.asignaturas.map(value => value.id)
	options.push("-")
	return (
		<Grid style={{ maxWidth: "fit-content" }} margin={"30px"} container spacing={3}>
			<Grid item xs={12}>
				<EditWeekHorario
					horario={horario.horario}
					setHorario={setMapHorario}
					selector={options}
					amountSemanas={horario.amountSemanas}
					fechaInicio={horario.fechaInicio}
					btnSave
					handleSave={handleSave}
				></EditWeekHorario>
			</Grid>
			<div class="fixed-bottom text-right mr-3 mb-3" style={{ textAlign: 'center' }}>
				<a href="/home" class="btn btn-secondary">Regresar al Home</a>
			</div>
		</Grid >
	)
}
import { Container, Grid, Pagination, ToggleButton, Typography } from "@mui/material";
import { useState } from "react";
import { GridSelect } from "./GridSelect";
import moment from 'moment'
import '../styles/revisar_horario_style.css'
import { GridInput } from "./GridInput";
const horarioData = {
	amountSemanas: 3,
	fechaInicio: moment("20/3/2024"),
	asignaturas: [{ id: 1, nombre: "Programacion", frecuency: 32 }, { id: 2, nombre: "Matematica", frecuency: 32 }, { id: 3, nombre: "Fisisca", frecuency: 32 }],
	horario: [{
		num: 1,
		semana: [
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"]
		]
	},
	{
		num: 2,
		semana: [
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"]
		]
	},
	{
		num: 3,
		semana: [
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"],
			[2, 2, 1, 3, "-", "-"]
		]
	}]
}
export function CheckHorario() {
	const [page, setPage] = useState(1)
	const [horario, setHorario] = useState(horarioData)
	const changePage = (event, value) => {
		setPage(value)
	}
	const onChangeAsign = (semana, turno) => (value) => {
		console.log("value", value)
		setHorario(oldHorario => {
			const clone = { ...oldHorario }
			const semanaToChange = clone.horario.find(sem => sem.num === page).semana
			semanaToChange[semana][turno] = value.target.value
			return clone
		})

	}
	const onChangeVetoBool = (value) => {
		setHorario(oldHorario => {
			const clone = { ...oldHorario }
			const semanaToChange = clone.horario.find(sem => sem.num === page)
			semanaToChange.veto = !semanaToChange.veto
			return clone
		})
	}
	const onChangeVeto = (value) => {
		setHorario(oldHorario => {
			const clone = { ...oldHorario }
			const semanaToChange = clone.horario.find(sem => sem.num === page)
			semanaToChange.vetoDescription = value.target.value
			return clone
		})
	}
	const semanaData = horario.horario.find(sem => sem.num === page)
	const semana = semanaData.semana

	const weeksDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
	console.log(page, semana)
	const optionsAsignaturas = horario.asignaturas.map(value => value.id)
	optionsAsignaturas.push("-")
	return (
		<Grid margin={"30px"} container spacing={3}>
			<Grid item xs={12}><Typography></Typography></Grid>
			<Grid item xs={12}>
				{semana && (
					<Container >
						<Grid container spacing={2}>
							{
								semana.map((iValue, iIndex) => {
									return (
										<Grid item container xs={2}>
											<Grid item xs={12}>{weeksDays[iIndex]}</Grid>
											{iValue.map((jValue, jIndex) => {
												return (
													<GridSelect disabled={semanaData.veto} onChange={onChangeAsign(iIndex, jIndex)} xs={12} value={jValue} values={optionsAsignaturas}></GridSelect>
												)
											})}
										</Grid>
									)
								})
							}
						</Grid>
					</Container>


				)
				}
			</Grid>
			<Grid item xs={12} justifyContent={'center'}>
				<div style={{ width: "fit-content" }}>
					<Grid item wrap="wrap"><Pagination sx={{ justifyContent: 'center' }} count={horario.amountSemanas} page={page} onChange={changePage}></Pagination></Grid>
				</div>

			</Grid>
			<Grid item xs={6} container>
				<Grid item xs={12}><Typography>Leyenda</Typography></Grid>
				{
					horario.asignaturas.map(value => (
						<Grid item container xs={12}>
							<Typography>{`${value.id} => ${value.nombre} : ${value.frecuency * 2} horas clase`}</Typography>
						</Grid>

					))
				}
			</Grid>

			<Grid item xs={3}><ToggleButton onChange={onChangeVetoBool} selected={!!semanaData.veto} >{semanaData.veto ? "Semana sin clases" : "Hacer esta semana sin clases"}</ToggleButton></Grid>
			{semanaData.veto ? <GridInput xs={3} onChange={onChangeVeto} label="Descripcion" value={semanaData.vetoDescription} ></GridInput> : null}
			<div class="fixed-bottom text-right mr-3 mb-3" style={{ textAlign: 'center' }}>
				<a href="/home" class="btn btn-secondary">Regresar al Login</a>
			</div>
		</Grid >
	)
}
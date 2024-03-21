import { Button, Container, Grid, Pagination, ToggleButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GridSelect } from "./GridSelect";
import moment from 'moment'
import '../styles/revisar_horario_style.css'
import { GridInput } from "./GridInput";

export function EditWeekHorario({ horario, setHorario, selector, amountSemanas, fechaInicio, handleSave }) {
	const [page, setPage] = useState(1)

	const changePage = (event, value) => {
		setPage(value)
	}

	useEffect(() => {

	}, [])
	console.log("init horario ", horario)
	const onChangeAsign = (semana, turno) => (value) => {
		const clone = [...horario]
		const semanaToChange = clone.find(sem => sem.num === page).semana
		semanaToChange[semana][turno] = value.target.value
		setHorario(clone)

	}
	const onChangeVetoBool = (value) => {
		const clone = [...horario]
		const semanaToChange = clone.find(sem => sem.num === page)
		semanaToChange.veto = !semanaToChange.veto
		setHorario(clone)
	}
	const onChangeVeto = (value) => {
		const clone = [...horario]
		const semanaToChange = clone.find(sem => sem.num === page)
		semanaToChange.vetoDescription = value.target.value
		setHorario(clone)
	}


	console.log("horariooooo", horario)
	const semanaData = horario?.find(sem => sem.num === page)
	const semana = semanaData?.semana

	const weeksDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
	const cloneFecha = moment(fechaInicio).clone()
	const fechaInSemana = cloneFecha.add(page - 1, 'weeks').format("YYYY-MM-DD")
	const fechaFinSemana = cloneFecha.add(5, 'days').format("YYYY-MM-DD")
	return (
		<Grid style={{ maxWidth: "fit-content" }} margin={"30px"} container spacing={3}>
			<Grid item xs={8}><Typography marginLeft={"50px"}>{fechaInSemana + " - " + fechaFinSemana}</Typography></Grid>
			<Grid item xs={2}><Button onClick={handleSave} >{"Guardar Cambios"}</Button></Grid>
			<Grid item xs={12}>
				{semana && (
					<Container >
						<Grid container spacing={2}>
							{
								semana.map((iValue, iIndex) => {
									return (
										<Grid item container spacing={1} xs={2}>
											<Grid item xs={12}>{weeksDays[iIndex]}</Grid>
											{iValue.map((jValue, jIndex) => {
												return (
													<GridSelect
														disabled={semanaData?.veto}
														onChange={onChangeAsign(iIndex, jIndex)}
														xs={12}
														value={jValue}
														values={selector || []}>

													</GridSelect>
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
					<Grid item wrap="wrap"><Pagination sx={{ justifyContent: 'center' }} count={amountSemanas} page={page} onChange={changePage}></Pagination></Grid>
				</div>

			</Grid>
			<Grid item xs={2}>
				<ToggleButton onChange={onChangeVetoBool} selected={!!semanaData?.veto} >{semanaData?.veto ? "Semana sin clases" : "Hacer esta semana sin clases"}</ToggleButton>
			</Grid>
			{semanaData?.veto ? <GridInput xs={3} onChange={onChangeVeto} label="Descripcion" value={semanaData?.vetoDescription} ></GridInput> : null}
		</Grid >
	)
}
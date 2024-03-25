import { Button, Container, Grid, Pagination, ToggleButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GridSelect } from "./GridSelect";
import moment from 'moment'
import '../styles/revisar_horario_style.css'
import { GridInput } from "./GridInput";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
export function EditWeekHorario({ horario, setHorario, selector, amountSemanas, fechaInicio, handleSave, btnSave, extraUpdate }) {
	const [page, setPage] = useState(1)

	const changePage = (event, value) => {
		setPage(value)
	}

	useEffect(() => {

	}, [])
	const onChangeAsign = (semana, turno) => (value) => {
		const clone = [...horario]
		const semanaToChange = clone.find(sem => sem.num === page).semana
		if (extraUpdate)
			extraUpdate(page, semana, turno, value.target.value)
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


	const semanaData = horario?.find(sem => sem.num === page)
	const semana = semanaData?.semana

	const weeksDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
	const cloneFecha = moment(fechaInicio).clone()
	const fechaInSemana = cloneFecha.add(page - 1, 'weeks').format("YYYY-MM-DD")
	const fechaFinSemana = cloneFecha.add(5, 'days').format("YYYY-MM-DD")
	return (
		<Grid style={{ maxWidth: "fit-content" }} margin={"30px"} container spacing={3}>
			<Grid item xs={8} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><Typography marginLeft={"50px"} fontSize={"x-large"}>{fechaInSemana + " - " + fechaFinSemana}</Typography></Grid>
			{btnSave ? <Grid item xs={4}><Button style={{ backgroundColor: " #3899f9", color: "white" }} onClick={handleSave}> <SaveOutlinedIcon />{"Guardar Cambios"}</Button></Grid> : null}
			<Grid item xs={12}>
				{semana && (
					<Container style={{ textAlign: "center" }}>
						<Grid container spacing={2} style={{ justifyContent: "center" }}>
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
			<Grid item xs={12} style={{ justifyContent: "center", display: "flex" }}>
				<div style={{ width: "fit-content" }}>
					<Grid item wrap="wrap"><Pagination sx={{ justifyContent: 'center' }} count={amountSemanas} page={page} onChange={changePage}></Pagination></Grid>
				</div>

			</Grid>
			<Grid item xs={6} style={{ justifyContent: "center", display: "flex" }}>
				<ToggleButton onChange={onChangeVetoBool} selected={!!semanaData?.veto} style={{ backgroundColor: "#e7e7e7" }} >{semanaData?.veto ? "Semana sin clases" : "Hacer esta semana sin clases"}</ToggleButton>
			</Grid>
			{semanaData?.veto ? <GridInput xs={3} onChange={onChangeVeto} label="Descripcion" value={semanaData?.vetoDescription} ></GridInput> : null}
		</Grid >
	)
}
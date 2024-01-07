import { useEffect, useRef, useState } from "react";

import { Avatar, Button, Grid, IconButton, Input, List, ListItem, ListItemAvatar } from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";
import { deleteHorario, getAllHorarios } from "../apiconn/data";
import AddIcon from '@mui/icons-material/Add';
import { GridInput } from "./GridInput";
import moment from "moment";
import JsxParser from 'react-jsx-parser'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsCookie from "js-cookie";

const getRoleCookie = () => {
	console.log(jsCookie.get('role'))
	return jsCookie.get('role')
}
export function ListHorario() {
	// states
	const [horarios, setHorarios] = useState([])
	const [refresh, setRefresh] = useState(true)
	const [dynamicHtml, setdynamicHtml] = useState("")
	const [showDownloadButton, setShowDownloadButton] = useState(false)

	// effects
	useEffect(() => {
		async function fetch() {
			const data = await getAllHorarios()
			setHorarios(data.data)
		}
		fetch()
		if (refresh)
			fetch()
		return () => {
			setRefresh(false)
		}
	}, [refresh])

	const handleEdit = (id) => () => {
		window.location.href = "/revisar_horario/" + id
	}

	const handleOnChange = (event) => {

	}

	const handleDelete = (id) => () => {
		deleteHorario(id).then(() => setRefresh(true))
	}
	const handleCreate = () => {
		window.location.href = "/hacer_horario"
	}

	const handleDownload = (id) => () => {
		const horarioData = horarios.filter(value => value.id === id)[0]
		console.log(horarioData)
		// Otras variables necesarias
		const carrera = horarioData.curso.carrera.nombre
		const semestre = horarioData.curso.semestre
		const anno = horarioData.curso.anno
		// horario to table
		let htmlToAdd = '<table id="table-id"><th> Carrera: ' + carrera + "</th><th> Año: " + anno + "</th><th> Semestre: " + semestre + "</th>"
		// console.log(htmlToAdd)
		const weeksDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
		const info = JSON.parse(horarioData.info)
		const cloneFecha = moment(horarioData.fechaInicio).clone()
		info.horario.forEach((valueCurrent, index) => {
			const fechaInSemana = cloneFecha.clone().add(valueCurrent.num, 'weeks').format("YYYY-MM-DD")
			const fechaFinSemana = cloneFecha.clone().add(5, 'days').format("YYYY-MM-DD")
			htmlToAdd += '<tr></tr><th>semana ' + (index + 1) + '</th>' + '<th> Fecha de Inicio: </th>' + '<th>' + fechaInSemana + '</th>' + '<th> Fecha de fin: </th>' + '<th>' + fechaFinSemana + '</th> '
			if (valueCurrent.veto)
				htmlToAdd += '<tr><td> Semana sin clase </td>' + '<td>' + valueCurrent.vetoDescription + '</td></tr>'
			else
				for (let i = -1; i < 6; i++) {

					if (i === 3)
						htmlToAdd += '<tr><td>Tarde</td></tr>'
					htmlToAdd += '<tr>'
					for (let j = 0; j < 5; j++) {
						if (i === -1)
							htmlToAdd += '<td>' + weeksDays[j] + '</td>'
						else
							htmlToAdd += '<td>' + valueCurrent.semana[j][i] + '</td>'
					}

					htmlToAdd += '</tr>'
				}

		})
		htmlToAdd += '<tr><td>Leyenda</td></tr>'
		htmlToAdd += '<tr><td>Número</td><td>Asignatura</td><td>Profesores</td><td>Horas clase</td></tr>'
		horarioData.curso.asignProfCursos.forEach(a => {
			htmlToAdd += '<tr><td>' + a.asignaturaId + ' </td><td> ' + a.asignatura.nombre + '</td><td> ' + a.profesor.nombre + '</td><td> ' + a.frecuency + '</td></tr>'
		})
		htmlToAdd += '</table>'

		// console.log(htmlToAdd)
		// const table = document.createElement("table")
		// table.setAttribute('style', 'width:1200px')
		// table.setAttribute('id', 'table-id')

		// const div = document.getElementById('table').appendChild(table)
		setdynamicHtml(htmlToAdd)
		setShowDownloadButton(true)
	}
	return (
		<div className="container-fluid" style={{ maxWidth: "1000px" }}>
			<List dense={true}>
				{horarios.map((value) => (
					<ListItem
						sx={{ margin: "10px" }}
						key={value.id}
						secondaryAction={
							<div>
								{getRoleCookie() !== 'Profesor' && <IconButton onClick={handleEdit(value.id)} edge="end" aria-label="edit" sx={{ marginRight: '10px' }}>
									<Edit />
								</IconButton>}
								<IconButton onClick={handleDownload(value.id)}> <Save> </Save></IconButton>
								{getRoleCookie() !== 'Profesor' && <IconButton onClick={handleDelete(value.id)} edge="end" aria-label="delete">
									<Delete />
								</IconButton >}
							</div>

						}
					>
						<Grid container spacing={3}>
							<GridInput
								xs={4}
								onChange={handleOnChange(value.id)}
								disabled={!value.editable}
								variant="body2"
								value={value.code}
								label={"Codigo"}>
							</GridInput>
						</Grid>

					</ListItem>
				))
				}
				<ListItem sx={{ justifyContent: 'center' }}>

					<IconButton onClick={handleCreate} edge="end" aria-label="delete">
						<AddIcon />
					</IconButton>
				</ListItem>
			</List>
			{showDownloadButton && <ReactHTMLTableToExcel

				id="test-table-xls-button"
				className="download-table-xls-button"
				table="table-id"
				filename="tablexls"
				sheet="tablexls"
				buttonText="Descargar XLS" />}

			<JsxParser
				jsx={dynamicHtml}
			/>

			<div class="fixed-bottom text-right mr-3 mb-3" style={{ textAlign: 'center' }}>
				<a href="/home" class="btn btn-secondary">Regresar al Home</a>
			</div>
		</div >)
}
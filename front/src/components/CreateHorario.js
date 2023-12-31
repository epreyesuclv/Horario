import { FormControl, Grid, Input, InputLabel, MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import { getCarreras, getAllAsignaturasBy } from '../apiconn/data'


export function CreateHorario() {

	const [formData, setFormData] = useState({
		carrera: "",
		anno: "",
		semestre: "",
		semanas: "",
		startDate: new Date()
	})
	const [carreras, setCarreras] = useState([])

	useEffect(() => {
		async function fetch() {
			const data = await getCarreras()
			console.log(data.data)
			setCarreras(data.data)
		}
		fetch()
	}, [])

	useEffect(() => {
		async function fetch(params) {
			if (formData.carrera !== "" && formData.anno !== "" && formData.semestre !== "") {
				const data = await getAllAsignaturasBy(formData.anno, formData.semestre, formData.carrera)
				console.log(data)
			}
		}
		fetch()

	}, [formData])
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
				</Grid>
			</form>
		</div >
	)
}
import { Avatar, IconButton, Input, List, ListItem, ListItemAvatar } from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { addProfesor, deleteProfesor, getAllProfesors, updateProfesor } from "../apiconn/data";
import AddIcon from '@mui/icons-material/Add';

export function Profesor() {
	// states
	const [profesors, setProfesors] = useState([])
	const [refresh, setRefresh] = useState(true)

	const [newProfesor, setNewProfesor] = useState("")
	const [addNew, setAddNew] = useState(false)


	// effects
	useEffect(() => {
		async function fetch() {
			const data = await getAllProfesors()
			setProfesors(data.data.map(value => ({ ...value, name: value.nombre, editable: false })))
		}
		if (refresh)
			fetch()
		return () => {
			setRefresh(false)
		}
	}, [refresh])

	const handleEdit = (id) => () => {
		const profesor = profesors.find(profesor => profesor.id === id)
		if (!profesor.editable) {
			profesor.editable = true
			setProfesors([...profesors])
		} else {
			updateProfesor(id, profesor.name)
			profesor.editable = false
			setProfesors([...profesors])
		}
	}
	const handleOnChange = (id) => (event) => {
		profesors.find(profesor => profesor.id === id).name = event.target.value
		setProfesors([...profesors])
	}

	const handleOnChangeNew = (value) => {
		setNewProfesor(value.target.value)
	}
	const handleDelete = (id) => () => {
		deleteProfesor(id).then(value => setRefresh(true))
	}
	const handleCreate = () => {
		addProfesor(newProfesor).then(() => setRefresh(true))
		setAddNew(false)
		setNewProfesor("")
	}

	return (
		<div className="container-fluid" style={{ maxWidth: "500px" }}>
			<List dense>
				{profesors.map((value) => (
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
						<ListItemAvatar>
							<Avatar>
							</Avatar>
						</ListItemAvatar>
						<Input onChange={handleOnChange(value.id)} disabled={!value.editable} variant="body2"
							primary="Single-line item"
							value={value.name}
						>
						</Input>
					</ListItem>
				))
				}
				<ListItem sx={{ justifyContent: 'center' }}>
					{addNew ?
						<div>
							<Input onChange={handleOnChangeNew} variant="body2"
								primary="Single-line item"
								value={newProfesor}
							>
							</Input>
							<IconButton onClick={handleCreate} >
								<Save></Save>
							</IconButton>
						</div> :
						<IconButton onClick={() => setAddNew(true)} edge="end" aria-label="delete">
							<AddIcon />
						</IconButton>}
				</ListItem>
			</List>
			<div class="fixed-bottom text-right mr-3 mb-3" style={{ textAlign: 'center' }}>
				<a href="/home" class="btn btn-secondary">Regresar al Home</a>
			</div>
		</div>)
}
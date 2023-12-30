import { Avatar, IconButton, Input, List, ListItem, ListItemAvatar } from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";
import { useState } from "react";
import { deleteProfesor, updateProfesor } from "../apiconn/data";
export function Profesor() {

	const [profesors, setProfesors] = useState([{ id: 1, name: "alfonso", editable: true }])
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
	const handleDelete = (id) => () => {
		deleteProfesor(id)
	}
	
	return (
		<div className="container-fluid" style={{ maxWidth: "500px" }}>
			<List dense={true}>
				{profesors.map((value) => (
					<ListItem
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
			</List>
		</div>)
}
import { useEffect, useState } from "react";

import { Avatar, IconButton, Input, List, ListItem, ListItemAvatar } from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";
import { addusuario, deleteusuario, getAllusuarios, updateusuario } from "../apiconn/data";
import AddIcon from '@mui/icons-material/Add';

export function Usuario() {
	// states
	const [usuarios, setusuarios] = useState([])
	const [refresh, setRefresh] = useState(true)

	const [newusuario, setNewusuario] = useState("")
	const [addNew, setAddNew] = useState(false)


	// effects
	useEffect(() => {
		async function fetch() {
			const data = await getAllusuarios()
			setusuarios(data.data.map(value => ({ ...value, name: value.nombre, editable: false })))
		}
		if (refresh)
			fetch()
		return () => {
			setRefresh(false)
		}
	}, [refresh])

	const handleEdit = (id) => () => {
		const usuario = usuarios.find(usuario => usuario.id === id)
		if (!usuario.editable) {
			usuario.editable = true
			setusuarios([...usuarios])
		} else {
			updateusuario(id, usuario.name)
			usuario.editable = false
			setusuarios([...usuarios])
		}
	}
	const handleOnChange = (id) => (event) => {
		usuarios.find(usuario => usuario.id === id).name = event.target.value
		setusuarios([...usuarios])
	}

	const handleOnChangeNew = (value) => {
		setNewusuario(value.target.value)
	}
	const handleDelete = (id) => () => {
		deleteusuario(id).then(value => setRefresh(true))
	}
	const handleCreate = () => {
		addusuario(newusuario).then(() => setRefresh(true))
		setAddNew(false)
		setNewusuario("")
	}

	return (
		<div className="container-fluid" style={{ maxWidth: "500px" }}>
			<List dense={true}>
				{usuarios.map((value) => (
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
								value={newusuario}
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
				<a href="/home" class="btn btn-secondary">Regresar al Login</a>
			</div>
		</div>)
}
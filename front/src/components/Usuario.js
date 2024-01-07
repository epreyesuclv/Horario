import { useEffect, useState } from "react";

import { Avatar, Grid, IconButton, Input, List, ListItem, ListItemAvatar } from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";
import { addusuario, deleteusuario, getAllusuarios, updateusuario } from "../apiconn/data";
import AddIcon from '@mui/icons-material/Add';
import { GridInput } from "./GridInput";
import { GridSelect } from "./GridSelect";

export function Usuario() {
	// states
	const [usuarios, setusuarios] = useState([])
	const [refresh, setRefresh] = useState(true)
	const [newusuario, setNewusuario] = useState("")
	const [newRole, setNewRole] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [addNew, setAddNew] = useState(false)


	// effects
	useEffect(() => {
		async function fetch() {
			const data = await getAllusuarios()
			setusuarios(data.data.map(value => ({ ...value, username: value.username, editable: false })))
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
	const handleOnChangePassword = (id) => (event) => {
		usuarios.find(usuario => usuario.id === id).password = event.target.value
	}
	const handleOnChangeRole = (id) => (event) => {
		usuarios.find(usuario => usuario.id === id).role = event.target.value
	}


	const handleOnChangeNew = (value) => {
		setNewusuario(value.target.value)
	}
	const handleOnChangeNewPassword = (value) => {
		setNewPassword(value.target.value)
	}
	const handleOnChangeNewRole = (value) => {
		setNewRole(value.target.value)
	}


	const handleDelete = (id) => () => {
		deleteusuario(id).then(value => setRefresh(true))
	}
	const handleCreate = () => {
		addusuario(newusuario, newPassword, newRole).then((value) => setRefresh(true))
		setAddNew(false)
		setNewusuario("")
	}
	const handleReset = () => {
		setAddNew(false)
		setNewPassword("")
		setNewRole("")
		setNewusuario("")
	}

	return (
		<div className="container-fluid" style={{ maxWidth: "1000px" }}>
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
						<Grid container spacing={3}>
							<GridInput
								xs={3}
								onChange={handleOnChange(value.id)}
								disabled={!value.editable}
								variant="body2"
								value={value.username}
								label={"Nombre Usuario"}>
							</GridInput>

							<GridInput
								xs={3}
								onChange={handleOnChangePassword(value.id)}
								disabled={!value.editable}
								variant="body2"
								value={value.password}
								label={"Contraseña"}>
							</GridInput>

							<GridSelect
								xs={3}
								onChange={handleOnChangeRole(value.id)}
								disabled={!value.editable}
								value={value.role}
								label={"Role"}
								values={['Administrador', 'Profesor', 'Planificador Docente']}>
							</GridSelect>
						</Grid>

					</ListItem>
				))
				}
				<ListItem sx={{ justifyContent: 'center' }}
					secondaryAction={
						addNew ?
							<div>
								<IconButton onClick={handleCreate} edge="end" aria-label="edit" sx={{ marginRight: '10px' }}>
									{<Save></Save>}
								</IconButton>
								<IconButton onClick={handleReset} edge="end" aria-label="delete">
									<Delete />
								</IconButton>
							</div> : null

					}>
					{addNew ?
						<Grid container spacing={3}>
							<GridInput
								xs={3}
								onChange={handleOnChangeNew}
								value={newusuario}
								label={"Nombre Usuario"}>
							</GridInput>

							<GridInput
								xs={3}
								onChange={handleOnChangeNewPassword}
								value={newPassword}
								label={"Contraseña"}>
							</GridInput>

							<GridSelect
								xs={3}
								onChange={handleOnChangeNewRole}
								value={newRole}
								label={"Role"}
								values={['Administrador', 'Profesor', 'Planificador Docente']}>
							</GridSelect>
						</Grid>
						:
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
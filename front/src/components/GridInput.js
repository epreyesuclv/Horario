import { FormControl, Grid, Input, InputLabel } from "@mui/material";
import { useState } from "react";

export function GridInput({ label,xs, ...props }) {
	const [date] = useState(new Date())
	return (
		<Grid item xs={xs}>
			<FormControl fullWidth>
				<InputLabel id={date.toString()}>{label}</InputLabel>
				<Input
					{...props}
					id={date}
					required
					fullWidth
					label={label}
					placeholder={label}
				>
				</Input>
			</FormControl>
		</Grid>
	)

}
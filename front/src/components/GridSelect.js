import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export function GridSelect({ label, xs, values, disabled, ...props }) {
	const [date] = useState(new Date())
	return (
		<Grid item xs={xs}>
			<FormControl disabled={disabled} fullWidth>
				<InputLabel id={date.toString()}>{label}</InputLabel>
				<Select
					{...props}
					id={date}
					required
					fullWidth
					label={label}
					placeholder={label}
				>
					{values.map(value => <MenuItem value={value} key={value + new Date().toString()}>{value}</MenuItem>)}
				</Select>
			</FormControl>
		</Grid>
	)

}
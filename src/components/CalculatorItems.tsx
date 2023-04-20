import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  SelectChangeEvent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CalculationDetails } from "./CalculatorInput"
import * as db from '../data/db';

interface CalculatorItemsProps {
	/**
	 * Callback function to handle the selection of a category with modifier.
	 * @param details The details of the calculation.
	 */
	items: CalculationDetails[]
	onDelete: (id: number) => void
	onUpdate: (id: number, updatedItem: CalculationDetails) => void
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'calc(100vw - 8rem)',
	maxWidth: '400px',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

const CalculatorItems = (props: CalculatorItemsProps) => {
	return (
		<List sx={{
			padding: 0,
		}}>
			{
				props.items.map((item, index) => (
					<ListItem
						sx={{
							background: 'rgba(0, 148, 68, .2)',
							borderRadius: '5px',
							marginBottom: index !== props.items.length - 1 ? '.5rem' : 0,
						}}
						key={`${item.category.id}_${item.modifier.id}`}
						secondaryAction={
							<IconButton
								aria-label="delete"
								onClick={() => props.onDelete(item.category.id)}
							>
								<DeleteIcon />
							</IconButton>
						}
					>
						<ListItemText primary={item.category.name} secondary={`${item.value} ${item.modifier.label}`} />
						<ModalComp item={item} onUpdate={props.onUpdate} onDelete={props.onDelete}></ModalComp>
					</ListItem>
				))
			}
		</List>
	);
}

interface ModalCompProps {
	item: CalculationDetails,
	onUpdate: (id: number, updatedItem: CalculationDetails) => void
	onDelete: (id: number) => void
}

const ModalComp = (props: ModalCompProps) => {
	const [open, setOpen] = React.useState(false);
	const [item, setItem] = React.useState(props.item)
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleUpdate = () => {
		props.onUpdate(item.category.id, item)
		if(item.value === 0){
			props.onDelete(item.category.id)
		}
		handleClose()
	}

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setItem({
			...item,
			value: Number(e.target.value),
		})
	}

	const handleModifierChange = (e: SelectChangeEvent<number>) => {
		// Find a modifier in an array of modifiers by id
		let selectedModifier = db.getModifier(Number(e.target.value))
		if (!selectedModifier) {
			return
		}

		setItem({
			...item,
			modifier: selectedModifier
		})
	}

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
			>
			<Box sx={style}>
				<Grid
					container
					direction="column"
					justifyContent="center"
					spacing={2}
				>
					<Grid item xs={6} alignSelf="center">
						<Typography id="modal-modal-title" variant="h6" component="h2">
							{item.category.name}
						</Typography>
					</Grid>
					<Grid item xs={6} maxWidth="xs">
						<TextField fullWidth
							id="modifier-number"
							label={item.modifier.name}
							type="number"
							defaultValue={item.value}
								InputProps={{
									inputProps: { min: 0 }
								}}
								onFocus={event => {
									const target = event.target;
									setTimeout(() => target.select(), 0);
								}}
							onChange={handleQuantityChange}
						/>
					</Grid>
					<Grid item xs={6} maxWidth="xs">
						<FormControl fullWidth>
							<InputLabel id="units-label">Units</InputLabel>
							<Select
								id="units-select-label"
								labelId="units-label"
								label="Units"
								defaultValue={item.modifier.id}
								onChange={handleModifierChange}
							>
								{db.getModifiers().map((modifier) => (
									<MenuItem value={modifier.id} key={modifier.id}>{modifier.name}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={2} alignSelf="center">
						<Button variant="contained" size="large" onClick={handleUpdate}>Update</Button>
					</Grid>
				</Grid>
			</Box>

			</Modal>
			<Button onClick={handleOpen}>edit</Button>
		</>
	)
}
export default CalculatorItems;
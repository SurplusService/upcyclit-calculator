import React from 'react';
import { CalculationDetails } from "./CalculatorInput";
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    SelectChangeEvent, Autocomplete, TextField,
    FormControl, InputLabel,
    Select, MenuItem, Grid
} from '@mui/material';

interface CalculatorItemsProps {
    /**
     * Callback function to handle the selection of a category with modifier.
     * @param details The details of the calculation.
     */
    items: CalculationDetails[]
    onDelete: (id: number) => void
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const CalculatorItems = (props: CalculatorItemsProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <List>
            {
                props.items.map((item) => (
                    <ListItem
                        style={{
                            width: '585px',
                            height: '100px'
                        }}
                        key={`${item.category.id}_${item.modifier.id}`}
                        //change key to categoryid_modifierid
                        secondaryAction={
                            <IconButton
                                aria-label="delete"
                                onClick={() => props.onDelete(item.category.id)}
                            >
                                <DeleteIcon />
                            </IconButton>

                        }
                    >
                        <Modal
                            open={open}
                            onClose={handleClose}
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {item.category.name}
                                </Typography>
                                <Grid item sm={3} xs={6}>
                                    <TextField
                                        id="modifier-number"
                                        label={item.modifier.name}
                                        type="number"
                                        value={item.value}
                                    />
                                </Grid>
                                <Grid item sm={3} xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="units-label">Units</InputLabel>
                                        <Select
                                            id="units-select-label"
                                            labelId="units-label"
                                            value={item.modifier.name}
                                            label="Units"
                                        >
                                            <MenuItem value={0} key={0}>Quantity</MenuItem>
                                            <MenuItem value={1} key={1}>Weight(lbs)</MenuItem>
                                            <MenuItem value={2} key={2}>Gaylords</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <Button variant="contained" size="large" >Update</Button>
                                </Grid>
                            </Box>

                        </Modal>
                        <ListItemText primary={item.category.name} secondary={`${item.value} ${item.modifier.label}`} />
                        <Button onClick={handleOpen}>edit</Button>

                    </ListItem>
                ))
            }
        </List>

    );
}

export default CalculatorItems;
import React from 'react';
import { CalculationDetails } from "./CalculatorInput";
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CalculatorItemsProps {
    /**
     * Callback function to handle the selection of a category with modifier.
     * @param details The details of the calculation.
     */
    items: CalculationDetails[]
    onDelete: (id: number) => void
}

const CalculatorItems = (props: CalculatorItemsProps) => {
    return (
        <List>
            {
                props.items.map((item) => (
                    <ListItem
                        key={item.category.id}
                        secondaryAction={
                            <IconButton
                                aria-label="delete"
                                onClick={() => props.onDelete(item.category.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
>
                        <ListItemText primary={item.category.name} />
                    </ListItem>
                ))
            }
        </List>
    );
}

export default CalculatorItems;
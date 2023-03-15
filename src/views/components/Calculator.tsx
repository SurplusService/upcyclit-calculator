import React, { useState } from 'react';
import { Typography, Container, } from '@mui/material';
import CalculatorInput, { CalculationDetails } from './CalculatorInput';
import CalculatorGraph from './CalculatorGraph';
import CalculatorItems from './CalculatorItems';
import { SignalCellularConnectedNoInternet0Bar } from '@mui/icons-material';



const Calculator = () => {
    const [items, setItems] = useState<CalculationDetails[]>([])
    const handleSelect = (details: CalculationDetails) => {
        setItems([...items, details])
    }

    const handleDelete = (id: number) => {
        setItems(items.filter((item) => item.category.id !== id))
    }

    const handleUpdate = (id: number, updatedItem: CalculationDetails) => {
        let newItems: CalculationDetails[] = []

        for (let i = 0; i < items.length; i++) {
            // if item has target id, push the updated item
            if(items[i].category.id == id) {
                newItems.push(updatedItem)
            } else {
                newItems.push(items[i])
            }
        }

        setItems(newItems)
    }

    return (
        <Container>
            <Typography variant="h4" sx={{marginBottom: '1rem'}}>UpCycleIT® Calculator</Typography>
            <CalculatorInput onSelect={handleSelect} />
            <CalculatorItems items={items} onDelete={handleDelete} onUpdate={handleUpdate}></CalculatorItems>
            <CalculatorGraph items={items}></CalculatorGraph>
        </Container>
    );
}

// export function handle(id: number, updatedItem: CalculationDetails) {
//     if(id==updatedItem.category.id) {

//     }
// }

export default Calculator;
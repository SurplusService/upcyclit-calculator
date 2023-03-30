import React, { useState } from 'react';
import { Container, } from '@mui/material';
import CalculatorInput, { CalculationDetails } from './CalculatorInput';
import CalculatorGraph from './CalculatorGraph';
import CalculatorItems from './CalculatorItems';



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

        for (const element of items) {
            // if item has target id, push the updated item
            if (element.category.id === id) {
                newItems.push(updatedItem)
            } else {
                newItems.push(element)
            }
        }

        setItems(newItems)
    }

    return (
        <Container style={{
            borderRadius: '5px',
            width: 'fit-content'
        }} sx={{padding: 0}}>
            <Container style={{border: '1px dashed #CDE0EC', borderRadius: '4px'}} sx={{padding: 2}} maxWidth="lg" color="text.primary">
                <CalculatorInput onSelect={handleSelect} />
                <CalculatorItems items={items} onDelete={handleDelete} onUpdate={handleUpdate}></CalculatorItems>
                <CalculatorGraph items={items}></CalculatorGraph>
            </Container>
        </Container>
    );
}

export default Calculator;
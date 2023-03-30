import React, { useState } from 'react';
import { Grid, Stack, Container } from '@mui/material';
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
        <Container sx={{ height: '100%', padding: 2}} maxWidth="lg" color="text.primary">
        <Stack sx={{ height: '100%' }}>
            <CalculatorInput onSelect={handleSelect} />
            <Grid maxWidth="sm" mt={2} sx={{ flex: 1, overflowY: 'auto' }}>
                <CalculatorItems items={items} onDelete={handleDelete} onUpdate={handleUpdate} />
            </Grid>
            <CalculatorGraph items={items} />
        </Stack>
        </Container>
    );
}

export default Calculator;
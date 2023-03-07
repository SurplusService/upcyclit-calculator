import React, { useState } from 'react';
import { Typography, Container, } from '@mui/material';
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

    return (
        <Container>
            <Typography variant="h4" sx={{marginBottom: '1rem'}}>UpCycleIT® Calculator</Typography>
            <CalculatorInput onSelect={handleSelect} />
            <CalculatorItems items={items} onDelete={handleDelete}></CalculatorItems>
            <CalculatorGraph items={items}></CalculatorGraph>
        </Container>
    );
}

export default Calculator;
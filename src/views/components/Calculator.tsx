import React, { useState } from 'react';
import { Typography, Container, } from '@mui/material';
import CalculatorInput, { CalculationDetails } from './CalculatorInput';

const Calculator = () => {
    const [items, setItems] = useState<CalculationDetails[]>([])
    const handleSelect = (details: CalculationDetails) => {
        setItems([...items, details])
    }
    return (
        <Container>
            <Typography variant="h4" sx={{marginBottom: '1rem'}}>UpCycleIT® Calculator</Typography>
            <CalculatorInput onSelect={handleSelect} />
            {/* <CalculatorItemsView items={items}></CalculatorItemsView> */}
            {/* <CalculatorGraphs items={items}></CalculatorGraph> */}
            {/* <CalculatorContactButton /> */}
        </Container>
    );
}

export default Calculator;
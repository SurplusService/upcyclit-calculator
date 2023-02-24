import React from 'react';
import { Typography, Container, } from '@mui/material';
import CalculatorInput from './CalculatorInput';

class Calculator extends React.Component {
    render() {
        return (
            <Container>
                <Typography variant="h4" sx={{marginBottom: '1rem'}}>UpCycleIT® Calculator</Typography>
                <CalculatorInput onSelect={(details) => console.log(details)} />
            </Container>
        );
    }
}

export default Calculator;
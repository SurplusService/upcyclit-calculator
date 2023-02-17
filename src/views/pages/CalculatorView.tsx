import React from "react";
import { Typography, Container } from '@mui/material';
import Calculator from '../components/Calculator';

class CalculatorView extends React.Component {
    render() {
        return (
        <Container maxWidth="lg" color="text.primary">
            <Typography variant="h4">
                Calculator
            </Typography>
            <Typography variant="body1">
                This is the page showing the Calculator.
            </Typography>
            <Calculator />
        </Container>
        );
    }
}

export default CalculatorView;
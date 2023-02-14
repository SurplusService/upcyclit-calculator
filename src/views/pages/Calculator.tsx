import React from "react";
import { Typography, Container } from '@mui/material';

class Calculator extends React.Component {
    render() {
        return (
        <Container maxWidth="lg" color="text.primary">
            <Typography variant="h4">
                Calculator
            </Typography>
            <Typography variant="body1">
                This is where the Calculator application will go.
            </Typography>
        </Container>
        );
    }
}

export default Calculator;
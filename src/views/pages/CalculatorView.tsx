import React from 'react';
import { Container, } from '@mui/material';
import Calculator from '../components/Calculator';



class CalculatorView extends React.Component {
    

  render() {
    return (
      <Container sx={{padding: 0}} maxWidth="lg" color="text.primary">
        <Calculator/>
      </Container>
    );
  }
}

export default CalculatorView;

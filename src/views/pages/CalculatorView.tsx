import React from 'react';
import { Container, } from '@mui/material';
import Calculator from '../components/Calculator';



class CalculatorView extends React.Component {
    

  render() {
    return (
      <Container maxWidth="lg" color="text.primary">
        <Calculator/>
      </Container>
    );
  }
}

export default CalculatorView;

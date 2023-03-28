import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Calculator from './views/pages/CalculatorView'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css'

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h3: {
      fontSize: '24px',
      fontWeight: '700',
      fontStyle: 'normal',
    },
    body1: {
      fontSize: '16px',
      lineHeight: '1.5',
      fontWeight: '400',
    }
  },
  palette: {
    primary: {
      main: 'rgba(66, 133, 244, 1)',
      // main: 'rgb(42, 49, 53)',
    },
    text: {
      primary: 'rgba(108, 108, 108, 1)',
    }
  },
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Calculator />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

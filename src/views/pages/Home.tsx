import React from 'react';
import { Typography, Container } from '@mui/material';

class Home extends React.Component {
    render() {
        return (
        <Container maxWidth="lg" color="text.primary">
            <Typography variant="h4">
                Home
            </Typography>
            <Typography variant="body1">
                This is the home page. The first page a user will see when they visit the site.
            </Typography>
        </Container>
        );
    }
}

export default Home;
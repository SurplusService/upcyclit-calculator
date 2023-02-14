import React from "react";
import { Typography, Container } from '@mui/material';

class About extends React.Component {
    render() {
        return (
        <Container maxWidth="lg" color="text.primary">
            <Typography variant="h4">
                About
            </Typography>
            <Typography variant="body1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos expedita dolor quaerat
                mollitia ipsam iure dolores ex repellendus culpa eveniet temporibus soluta perspiciatis
                tempore quam unde dicta officiis, dignissimos magnam!
            </Typography>
        </Container>
        );
    }
}

export default About;
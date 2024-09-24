import React from 'react';
import { Container, Typography } from '@mui/material';

function Thankyou() {
    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Thank You!
            </Typography>
            <Typography variant="h6" align="center" paragraph>
                Thanks for filling out the form, we will update you soon!
            </Typography>
        </Container>
    );
}

export default Thankyou;

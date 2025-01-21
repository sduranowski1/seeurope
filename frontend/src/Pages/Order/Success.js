import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Container, Box, Button } from '@mui/material';

const Success = () => {
    const location = useLocation();
    const { orderId } = location.state || {};

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Order Placed Successfully!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Your order ID is: <strong>{orderId || 'N/A'}</strong>
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    href="/"
                    sx={{ mt: 3 }}
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default Success;

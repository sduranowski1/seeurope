import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Container, Box, Button } from '@mui/material';
import Paper from "@mui/material/Paper";
import authProvider from "../../authProvider";

const Success = () => {
    const location = useLocation();
    const { orderId } = location.state || {};
    const identity = authProvider.getIdentity();

    return (
        <Container maxWidth="sm" sx={{ mt: 20, mb: 20 }}>
            <Box textAlign="center">
                <Paper sx={{ p: 3 }} elevation={3}>
                <Typography variant="body1" gutterBottom>
                    Thanks!
                    {/*Thanks <strong>{identity.username || 'N/A'}</strong>*/}
                </Typography>
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
                </Paper>
            </Box>
        </Container>
    );
};

export default Success;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Container, Box, Button } from '@mui/material';
import Paper from "@mui/material/Paper";
import authProvider from "../../authProvider";
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";


const Success = () => {
    const location = useLocation();
    const { orderId } = location.state || {};
    const identity = authProvider.getIdentity();
    const navigate = useNavigate();
    const { t } = useTranslation();


    return (
        <Container maxWidth="sm" sx={{ mt: 20, mb: 20 }}>
            <Box textAlign="center">
                <Paper sx={{ p: 3 }} elevation={3}>
                    <Typography variant="body1" gutterBottom>
                        {t('success.thanks')}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        {t('success.orderPlaced')}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {/* Optionally, display the order ID */}
                        {/* {t('success.orderId', { orderId: orderId || 'N/A' })} */}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/')}
                        sx={{ mt: 3 }}
                    >
                        {t('success.backToHome')}
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default Success;

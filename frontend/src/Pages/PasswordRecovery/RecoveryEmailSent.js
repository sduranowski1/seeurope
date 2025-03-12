// RecoveryEmailSent.js
import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const RecoveryEmailSent = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f5f5f5"
        >
            <Typography variant="h6">
                A password recovery email has been sent. Please check your inbox.
            </Typography>
        </Box>
    );
};

export default RecoveryEmailSent;

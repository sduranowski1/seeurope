// RecoveryEmailSent.js
import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

const RecoveryEmailSent = () => {
    const { t } = useTranslation();  // Use the translation hook

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f5f5f5"
        >
            <Typography variant="h6">
                {t('passwordRecovery.sent')}
            </Typography>
        </Box>
    );
};

export default RecoveryEmailSent;

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, CardActions, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import i18n hook

const PasswordRecovery = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // Initialize navigate
    const { t } = useTranslation();  // Use the translation hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        const body = { email };

        try {
            const response = await fetch('https://se-europe-test.pl/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || t('passwordRecovery.successMessage'));

                // Redirect to the "Recovery Email Sent" page
                setTimeout(() => {
                    navigate('/recovery-email-sent');
                }, 2000); // 2-second delay before redirecting
            } else {
                setError(data.error || t('passwordRecovery.errorMessage'));
            }
        } catch (error) {
            setError(t('passwordRecovery.networkError'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f5f5f5"
        >
            <Card sx={{ minWidth: 275, maxWidth: 400 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {t('passwordRecovery.title')} {/* Translated title */}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label={t('passwordRecovery.emailLabel')}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <CardActions>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? t('passwordRecovery.sendingButton') : t('passwordRecovery.submitButton')} {/* Translated button text */}
                            </Button>
                        </CardActions>
                    </form>

                    {message && (
                        <Alert severity="success" sx={{ marginTop: 2 }}>
                            {message}
                        </Alert>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ marginTop: 2 }}>
                            {error}
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default PasswordRecovery;

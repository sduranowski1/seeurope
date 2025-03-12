import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { Button, Card, CardActions, CardContent, Typography, TextField, Alert } from "@mui/material";
import {useNavigate} from "react-router-dom";

const PasswordRecovery = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // Initialize navigate


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
                setMessage(data.message || 'Password recovery instructions have been sent to your email.');

                // Redirect to the "Recovery Email Sent" page
                setTimeout(() => {
                    navigate('/recovery-email-sent');
                }, 2000); // 2-second delay before redirecting
            } else {
                setError(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setError('Network error. Please try again later.');
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
                        Password Recovery
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
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
                                {loading ? 'Sending...' : 'Submit'}
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

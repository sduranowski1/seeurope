import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Button, Card, CardActions, CardContent, Typography, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";


const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation(); // Use the translation hook


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('https://127.0.0.1:8000/auth', {
      const response = await fetch('https://seequipment.pl/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      setToken(data.token);
      navigate('/dashboard'); // Redirect to dashboard after successful login

    } catch (error) {
      alert(error.message);
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
            {t('loginCart.title')} {/* Translated title */}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label={t('loginCart.email')}
                variant="outlined"
                fullWidth
                margin="normal"
                required
            />
            <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label={t('loginCart.password')}
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
              >
                {t('loginCart.button')} {/* Translated button text */}
              </Button>
            </CardActions>
            <Typography variant="body2" align="center" marginTop={2}>
              <Link to="/password-recovery" variant="body2">
                {t('loginCart.forgotPassword')} {/* Translated forgot password link */}
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

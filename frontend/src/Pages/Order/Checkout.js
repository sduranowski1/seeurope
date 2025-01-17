import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, Paper, Box, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import authProvider from "../../authProvider";

const Checkout = () => {
    const location = useLocation();
    const { cartItems, subtotal, tax, total } = location.state || {}; // Get cart data from state

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order placed!', formData);
    };

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const identity = await authProvider.getIdentity();
                setUserInfo(identity);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    if (!userInfo) {
        return <Typography>Loading...</Typography>;
    }


    return (
        <Container maxWidth="md" sx={{ mt: 4, marginBottom: 3 }}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    {/* User Information */}
                    <Grid item xs={12} md={7}>
                        <Paper sx={{ p: 3 }} elevation={3}>
                            <Typography variant="h6" gutterBottom>
                                Personal Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Email:</strong> {userInfo.email}  {/* Displaying email as plain text */}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                            {/*<Typography variant="h6" gutterBottom sx={{ mt: 3 }}>*/}
                            {/*    Shipping Address*/}
                            {/*</Typography>*/}
                            {/*<Grid container spacing={2}>*/}
                            {/*    <Grid item xs={12}>*/}
                            {/*        <TextField*/}
                            {/*            label="Address"*/}
                            {/*            name="address"*/}
                            {/*            value={formData.address}*/}
                            {/*            onChange={handleInputChange}*/}
                            {/*            fullWidth*/}
                            {/*            required*/}
                            {/*        />*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={6}>*/}
                            {/*        <TextField*/}
                            {/*            label="City"*/}
                            {/*            name="city"*/}
                            {/*            value={formData.city}*/}
                            {/*            onChange={handleInputChange}*/}
                            {/*            fullWidth*/}
                            {/*            required*/}
                            {/*        />*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={6}>*/}
                            {/*        <TextField*/}
                            {/*            label="Postal Code"*/}
                            {/*            name="postalCode"*/}
                            {/*            value={formData.postalCode}*/}
                            {/*            onChange={handleInputChange}*/}
                            {/*            fullWidth*/}
                            {/*            required*/}
                            {/*        />*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}

                            {/*<Typography variant="h6" gutterBottom sx={{ mt: 3 }}>*/}
                            {/*    Payment Details*/}
                            {/*</Typography>*/}
                            {/*<Grid container spacing={2}>*/}
                            {/*    <Grid item xs={12}>*/}
                            {/*        <TextField*/}
                            {/*            label="Card Number"*/}
                            {/*            name="cardNumber"*/}
                            {/*            value={formData.cardNumber}*/}
                            {/*            onChange={handleInputChange}*/}
                            {/*            fullWidth*/}
                            {/*            required*/}
                            {/*        />*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={6}>*/}
                            {/*        <TextField*/}
                            {/*            label="Expiry Date (MM/YY)"*/}
                            {/*            name="expiryDate"*/}
                            {/*            value={formData.expiryDate}*/}
                            {/*            onChange={handleInputChange}*/}
                            {/*            fullWidth*/}
                            {/*            required*/}
                            {/*        />*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={6}>*/}
                            {/*        <TextField*/}
                            {/*            label="CVV"*/}
                            {/*            name="cvv"*/}
                            {/*            value={formData.cvv}*/}
                            {/*            onChange={handleInputChange}*/}
                            {/*            fullWidth*/}
                            {/*            required*/}
                            {/*        />*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                    {/*    </Paper>*/}
                    {/*</Grid>*/}

                    {/* Order Summary */}
                    <Grid item xs={12} md={5}>
                        <Paper sx={{ p: 3 }} elevation={3}>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            {cartItems && cartItems.map((item) => {
                                const price = item.priceList?.find(p => p.nazwa === 'End User')?.netto || 0;
                                const quantity = item.quantity || 0;

                                return (
                                <Box key={item.id} display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                                    <Typography>{`${quantity} x ${item.name}`}</Typography>
                                    <Typography>${(price * quantity).toFixed(2)}</Typography>
                                </Box>
                                );
                            })}
                            <Divider sx={{ my: 2 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Typography>Subtotal:</Typography>
                                <Typography>${subtotal.toFixed(2)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>Tax (10%):</Typography>
                                <Typography>${tax.toFixed(2)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6">${total.toFixed(2)}</Typography>
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3 }}
                            >
                                Place Order
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Checkout;

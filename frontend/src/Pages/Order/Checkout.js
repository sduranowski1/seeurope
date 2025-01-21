import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box, Divider, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import authProvider from "../../authProvider";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, subtotal, tax, total } = location.state || {};

    const [userInfo, setUserInfo] = useState(null); // Basic user info from authProvider
    const [userDetails, setUserDetails] = useState(null); // Additional user details from API
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const identity = await authProvider.getIdentity();
                setUserInfo(identity);

                if (identity && identity.email) {
                    // Fetch additional user details using email
                    const response = await fetch(
                        `https://se-europe-test.pl/api/user_enovas?email=${encodeURIComponent(identity.email)}`,
                        {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                            },
                        }
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setUserDetails(data[0]); // Assuming the API returns an array with the user object
                    } else {
                        console.error('Failed to fetch additional user details:', response.status);
                    }
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleOrderSubmission = async () => {
        if (!cartItems || cartItems.length === 0) {
            alert('No items in the cart!');
            return;
        }

        setIsSubmitting(true);

        const orderData = {
            user: {
                email: userInfo?.email,
                name: userDetails?.name,
                address: userDetails?.address,
                phone: userDetails?.phone,
            },
            items: cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.priceList?.find((p) => p.nazwa === 'End User')?.netto || 0,
            })),
            subtotal,
            tax,
            total,
            orderDate: new Date().toISOString(),
        };

        try {
            const response = await fetch('https://se-europe-test.pl/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                // Redirect to success page
                navigate('/success', { state: { orderId: (await response.json()).id } });
            } else {
                console.error('Failed to submit order:', response.status);
                alert('Failed to place your order. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!userInfo) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, marginBottom: 3 }}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>
            <Grid container spacing={4}>
                {/* User Information */}
                <Grid item xs={12} md={7}>
                    <Paper sx={{ p: 3 }} elevation={3}>
                        <Typography variant="h6" gutterBottom>
                            Personal Information
                        </Typography>
                        <Box>
                            <Typography variant="body1">
                                <strong>Email:</strong> {userInfo.email}
                            </Typography>
                            {userDetails && (
                                <>
                                    <Typography variant="body1">
                                        <strong>Name:</strong> {userDetails.name || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Address:</strong> {userDetails.address || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Phone:</strong> {userDetails.phone || 'N/A'}
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Paper>
                </Grid>

                {/* Order Summary */}
                <Grid item xs={12} md={5}>
                    <Paper sx={{ p: 3 }} elevation={3}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        {cartItems &&
                            cartItems.map((item) => {
                                const price =
                                    item.priceList?.find((p) => p.nazwa === 'End User')?.netto || 0;
                                const quantity = item.quantity || 0;

                                return (
                                    <Box
                                        key={item.id}
                                        display="flex"
                                        justifyContent="space-between"
                                        sx={{ mb: 2 }}
                                    >
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
                            type="button"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                            onClick={handleOrderSubmission}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Placing Order...' : 'Place Order'}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Checkout;

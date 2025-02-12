import React, {useState, useEffect, useContext} from 'react';
import {Container, Typography, Grid, Paper, Box, Divider, Button, CircularProgress} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import authProvider from "../../authProvider";
import AuthContext from "../../AuthContext";
import {jwtDecode} from "jwt-decode";
import i18n from "i18next";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, subtotal, tax, total } = location.state || {};
    const { token } = useContext(AuthContext); // Get token from AuthContext

    const [userEmail, setUserEmail] = useState(null);
    // const [userInfo, setUserInfo] = useState(null); // Basic user info from authProvider
    const [userDetails, setUserDetails] = useState(null); // Additional user details from API
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (token) {
                    // Decode the JWT token to get the email
                    const decodedToken = jwtDecode(token);
                    console.log(decodedToken)
                    const email = decodedToken?.username;

                    if (email) {
                        setUserEmail(email);
                        console.log(email)

                        // Fetch additional user details using the email
                        const response = await fetch(
                            `https://se-europe-test.pl/api/user_enovas?email=${encodeURIComponent(email)}`,
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
                    } else {
                        console.error('Email not found in the token');
                    }
                } else {
                    console.error('Token is missing from AuthContext');
                }
            } catch (error) {
                console.error('Error decoding token or fetching user information:', error);
            }
        };

        fetchUserInfo();
    }, [token]);

    console.log('Current localStorage:', localStorage);
    console.log('Current localStorage:', userEmail);

    const savedContractorName = localStorage.getItem('contractorName');

    const handleOrderSubmission = async () => {
        if (!cartItems || cartItems.length === 0) {
            alert('No items in the cart!');
            return;
        }

        setIsSubmitting(true);

        const orderData = {
            email: userEmail,
            name: userDetails?.enovaPerson?.imie || "",
            address: userDetails?.address || "",
            phone: userDetails?.enovaPerson?.telKomorkowy || "",
            items: cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.priceList?.find(p => p.nazwa === savedContractorName)?.netto || item.priceList?.find(p => p.nazwa === 'End User')?.netto,
            })),
            subtotal,
            tax,
            total,
            orderDate: new Date().toISOString(),
            currency: storedPriceCurrency,
        };

        console.log(orderData);

        try {
            const response = await fetch('https://se-europe-test.pl/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                // Clear the cart data from localStorage
                localStorage.removeItem('cart');  // This will remove the cart from local storage

                // Redirect to success page
                navigate('/dashboard/success', { state: { orderId: (await response.json()).id } });
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

    const storedPriceCurrency = localStorage.getItem("priceCurrency");
    console.log(storedPriceCurrency)

    if (!userEmail) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="25vh" // Or use specific height if you want it in a smaller area
                width="100%"
            >
                <CircularProgress />
            </Box>
        );
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
                                <strong>Email:</strong> {userEmail}
                            </Typography>
                            {userDetails && (
                                <>
                                    <Typography variant="body1">
                                        <strong>Name:</strong> {userDetails?.enovaPerson?.imie || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Surname:</strong> {userDetails?.enovaPerson?.nazwisko || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Phone:</strong> {userDetails?.enovaPerson?.telKomorkowy || 'N/A'}
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
                                    item.priceList?.find(p => p.nazwa === savedContractorName)?.netto || item.priceList?.find(p => p.nazwa === 'End User')?.netto;
                                const quantity = item.quantity || 0;

                                return (
                                    <Box
                                        key={item.id}
                                        display="flex"
                                        justifyContent="space-between"
                                        sx={{ mb: 2 }}
                                    >
                                        <Typography>{`${quantity} x ${i18n.language === "en"
                                            ? item.productInfo?.englishTitle || item.name
                                            : i18n.language === "de"
                                                ? item.productInfo?.germanTitle || item.name
                                                : item.name}`}</Typography>
                                        <Typography>{(price * quantity).toFixed(2)} {storedPriceCurrency}</Typography>
                                    </Box>
                                );
                            })}
                        <Divider sx={{ my: 2 }} />
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Subtotal:</Typography>
                            <Typography>{subtotal.toFixed(2)} {storedPriceCurrency}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Tax (10%):</Typography>
                            <Typography>{tax.toFixed(2)} {storedPriceCurrency}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                            <Typography variant="h6">Total:</Typography>
                            <Typography variant="h6">{total.toFixed(2)} {storedPriceCurrency}</Typography>
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
            <Box mt={4} textAlign="left"> {/* Add the Return button */}
                <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={() => navigate(-1)} // Navigate back to the previous page
                >
                    Return
                </Button>
            </Box>
        </Container>
    );
};

export default Checkout;

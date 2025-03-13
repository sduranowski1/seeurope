import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    Paper,
    Box,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Cart = () => {
    const navigate = useNavigate();

    // State to store cart items
    const [cartItems, setCartItems] = useState([]);

    // Load cart data from localStorage on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    console.log(cartItems)

    useEffect(() => {
        const handleLanguageChange = () => {
            setCartItems([...cartItems]); // Trigger re-render
        };

        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [cartItems]); // Listen for cartItems to keep UI updated


    // Update quantity for a cart item
    const updateQuantity = (id, quantity) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    };

    // Remove an item from the cart
    const removeItem = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    };

    const savedContractorName = localStorage.getItem('contractorName');

    // Calculate subtotal
// Calculate subtotal with checks for valid numbers
    const calculateSubtotal = () =>
        cartItems.reduce((total, item) => {
            const price = Number(item.priceList?.find(p => p.nazwa === savedContractorName)?.netto || item.priceList?.find(p => p.nazwa === 'End User')?.netto); // Ensure price is a number
            const quantity = Number(item.quantity || 0); // Ensure quantity is a number
            return total + (price * quantity);
        }, 0);


    // const TAX_RATE = 0.1; // 10% tax
    const subtotal = calculateSubtotal();
    const total = subtotal;
    const storedPriceCurrency = localStorage.getItem("priceCurrency");

    const { t } = useTranslation();


    return (
        <Container maxWidth="lg" sx={{ mt: 4, marginBottom: 3 }}>
            <Typography variant="h4" gutterBottom>
                {t("cart.title")}
            </Typography>
            {cartItems.length === 0 ? (
                <Typography variant="h6">{t("cart.empty")}</Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t("cart.product")}</TableCell>
                                    <TableCell align="right">{t("cart.price")}</TableCell>
                                    <TableCell align="center">{t("cart.quantity")}</TableCell>
                                    <TableCell align="right">{t("cart.total")}</TableCell>
                                    <TableCell align="center">{t("cart.action")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) => {
                                    // Find the price object where nazwa is 'End User'
                                    const price = item.priceList?.find(p => p.nazwa === savedContractorName)?.netto || item.priceList?.find(p => p.nazwa === 'End User')?.netto;  // Fallback to 0 if not found
                                    const quantity = item.quantity || 0; // Fallback to 0 if quantity is undefined

                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Box display="flex" alignItems="center">
                                                    <img
                                                        src={
                                                            item.productInfo?.imagePath && item.productInfo.imagePath !== "https://www.se-europe-test.pl"
                                                                ? `https://www.se-europe-test.pl${item.productInfo.imagePath}`
                                                                : 'https://www.se-europe-test.pl/media/item_types/landscape-placeholder.svg'
                                                        }
                                                        // Fallback to a placeholder image
                                                        alt={item.name || 'Unnamed Product'} // Fallback to a generic name
                                                        style={{ width: '50px', marginRight: '10px' }}
                                                    />
                                                    {i18n.language === "en"
                                                        ? item.features?.find(feature => feature.nazwa === "Nazwa w EN")?.wartosc || item.name
                                                        : i18n.language === "de"
                                                            ? item.features?.find(feature => feature.nazwa === "Nazwa w DE")?.wartosc || item.name
                                                            : item.name}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">{price.toFixed(2)} {storedPriceCurrency}</TableCell>
                                            {/* Editable Quantity Field */}
                                            <TableCell align="center">
                                                <TextField
                                                    type="number"
                                                    variant="outlined"
                                                    size="small"
                                                    value={quantity}
                                                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                                                    inputProps={{ min: 1 }}
                                                    sx={{ width: "70px" }}
                                                />
                                            </TableCell>

                                            <TableCell align="right">
                                                {(price * quantity).toFixed(2)} {storedPriceCurrency}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    {t('cart.remove')}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box mt={3} textAlign="right">
                        <Typography variant="body1">{t("cart.subtotal")}: {subtotal.toFixed(2)} {storedPriceCurrency}</Typography>
                        {/*<Typography variant="body1">Tax (10%): {tax.toFixed(2)} {storedPriceCurrency}</Typography>*/}
                        <Typography variant="h6">{t("cart.total")}: {total.toFixed(2)} {storedPriceCurrency}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 2 }}
                            onClick={() => navigate('/dashboard/checkout', { state: { cartItems, subtotal, total } })}
                            // onClick={() => navigate('/dashboard/checkout', { state: { cartItems, subtotal, tax, total } })}
                        >
                            {t("cart.checkout")}
                        </Button>
                    </Box>

                </>
            )}
            <Box mt={4} textAlign="left"> {/* Add the Return button */}
                <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={() => navigate(-1)} // Navigate back to the previous page
                >
                    {t("cart.return")}
                </Button>
            </Box>
        </Container>
    );
};

export default Cart;

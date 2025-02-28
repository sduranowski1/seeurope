import React, {useState, useEffect, useContext} from 'react';
import {
    Container,
    Typography,
    Grid,
    Paper,
    Box,
    Divider,
    Button,
    CircularProgress,
    Tabs,
    Tab,
    TextField,
    FormControl, InputLabel, Select, MenuItem, FormControlLabel, Radio, RadioGroup
} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { useLocation, useNavigate } from 'react-router-dom';
import authProvider from "../../authProvider";
import AuthContext from "../../AuthContext";
import {jwtDecode} from "jwt-decode";
import i18n from "i18next";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ConfirmationDialog from "../../Components/OrderConfirmationModal/ConfirmationDialog";
// import {Radio, RadioGroup} from "@mui/joy";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const { cartItems, subtotal, tax, total } = location.state || {};
    const { cartItems, subtotal, total } = location.state || {};
    const { token } = useContext(AuthContext); // Get token from AuthContext

    const [userEmail, setUserEmail] = useState(null);
    // const [userInfo, setUserInfo] = useState(null); // Basic user info from authProvider
    const [userDetails, setUserDetails] = useState(null); // Additional user details from API
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState('existing');  // Default to 'existing'
    const [newAddress, setNewAddress] = useState({
        voivodeship: '',
        region: '',
        buildingNumber: '',
        apartmentNumber: '',
        postOffice: '',
        district: '',
        regon: '',
        phone: '',
        street: '',
        city: '',
        zipCode: '',
        country: '',
    });

    const [selectedLocation, setSelectedLocation] = useState("");
    const [date, setDate] = useState(null);

    const [selectedOption, setSelectedOption] = useState(null);
    const [contactPerson, setContactPerson] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [orderNumber, setOrderNumber] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const handleConfirmOpen = () => setOpenDialog(true);
    const handleConfirmClose = () => setOpenDialog(false);

    const handleConfirmSubmit = () => {
        setOpenDialog(false);
        handleOrderSubmission(); // Call the existing order submission function
    };

    const handleCheckboxChange = (event) => {
        setSelectedOption(event.target.value);
    };

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

    console.log(userDetails?.enovaPerson?.contractor?.idEnova)
    const contractorId = userDetails?.enovaPerson?.contractor?.idEnova

    console.log(userDetails?.enovaPerson?.contractor?.idEnova)
    const contractorLocationId = userDetails?.enovaPerson?.contractor?.locations[selectedLocation]?.id

    console.log('Current localStorage:', localStorage);
    console.log('Current localStorage:', userEmail);

    const savedContractorName = localStorage.getItem('contractorName');

    const handleOrderSubmission = async () => {
        if (!cartItems || cartItems.length === 0) {
            alert('No items in the cart!');
            return;
        }

        setIsSubmitting(true);

        // const orderData = {
        //     email: userEmail,
        //     name: userDetails?.enovaPerson?.imie || "",
        //     // address: userDetails?.address || "",
        //     address: selectedAddress === 'existing' ? {
        //
        //         voivodeship: locations[selectedLocation]?.adresLocation?.wojewodztwo || "",
        //         region: locations[selectedLocation]?.adresLocation?.gmina || "",
        //         buildingNumber: locations[selectedLocation]?.adresLocation?.nrDomu || "",
        //         apartmentNumber: locations[selectedLocation]?.adresLocation?.nrLokalu || "",
        //         postOffice: locations[selectedLocation]?.adresLocation?.poczta || "",
        //         district: locations[selectedLocation]?.adresLocation?.powiat || "",
        //         regon: locations[selectedLocation]?.adresLocation?.Regon || "",
        //         phone: locations[selectedLocation]?.adresLocation?.telefon || "",
        //         street: locations[selectedLocation]?.adresLocation?.ulica || "",
        //         city: locations[selectedLocation]?.adresLocation?.miejscowosc || "",
        //         zipCode: locations[selectedLocation]?.adresLocation?.kodPocztowy || "",
        //         country: locations[selectedLocation]?.adresLocation?.kraj || "",
        //     } : {
        //         voivodeship: newAddress?.voivodeship || "", // New Address Field
        //         region: newAddress?.region || "", // New Address Field
        //         buildingNumber: newAddress?.buildingNumber || "", // New Address Field
        //         apartmentNumber: newAddress?.apartmentNumber || "", // New Address Field
        //         postOffice: newAddress?.postOffice || "", // New Address Field
        //         district: newAddress?.district || "", // New Address Field
        //         regon: newAddress?.regon || "", // New Address Field
        //         phone: newAddress?.phone || "", // New Address Field
        //         street: newAddress?.street || "", // New Address Field
        //         city: newAddress?.city || "", // New Address Field
        //         zipCode: newAddress?.zipCode || "", // New Address Field
        //         country: newAddress?.country || "", // New Address Field
        //     },
        //     phone: userDetails?.enovaPerson?.telKomorkowy || "",
        //     contactPerson: contactPerson,
        //     requestedOrderDate: selectedDate ? selectedDate.toISOString() : "",
        //     orderNumber: orderNumber,
        //     shippingMethod: selectedOption,
        //     items: cartItems.map((item) => ({
        //         id: item.id,
        //         name: i18n.language === "en"
        //                 ? item.productInfo?.englishTitle || item.name
        //                 : i18n.language === "de"
        //                     ? item.productInfo?.germanTitle || item.name
        //                     : item.name,
        //         quantity: item.quantity,
        //         price: item.priceList?.find(p => p.nazwa === savedContractorName)?.netto || item.priceList?.find(p => p.nazwa === 'End User')?.netto,
        //     })),
        //     subtotal,
        //     // tax,
        //     total,
        //     orderDate: new Date().toISOString(),
        //     currency: storedPriceCurrency,
        // };
        let currentIdWWW = 16; // Starting from 7

        const orderDataEnova = {
            idWWW: currentIdWWW++, // Assuming this is an auto-increment or placeholder value
            idEnova: 112250, // Assuming this is an auto-increment or placeholder value
            email: userEmail, // Assuming this is an auto-increment or placeholder value
            idPlatnosciInternetowej: "string", // Add the payment method ID as a string
            numerWWW: "numer WWW", // Add the WWW number (order number)
            numerEnova: "SE/000005/9", // Add the Enova number (order reference)
            wartosc: total, // Assuming total is the total order value
            wartoscWaluta: total, // Assuming the same value for currency (can be adjusted if needed)
            platnik: contractorId, // Assuming the payer ID (if applicable)
            odbiorca: contractorId, // Assuming the recipient ID (if applicable)
            lokalizacjaDostawy: {
                kod: "string", // Add a string for location code
                nazwa: "string", // Add a string for location name
                eMail: userEmail, // Add email from user details
                id: contractorLocationId, // Assuming the location ID (can be adjusted if applicable)
                idWWW: 0, // Assuming this is a placeholder or related to the order
                adres: {
                    id: "1",
                    wojewodztwo: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.wojewodztwo || "" : newAddress?.voivodeship || "", // Voivodeship
                    gmina: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.gmina || "" : newAddress?.region || "", // Region
                    nrDomu: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.nrDomu || "" : newAddress?.buildingNumber || "", // Building number
                    nrLokalu: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.nrLokalu || "" : newAddress?.apartmentNumber || "", // Apartment number
                    poczta: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.poczta || "" : newAddress?.postOffice || "", // Post office
                    powiat: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.powiat || "" : newAddress?.district || "", // District
                    regon: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.Regon || "" : newAddress?.regon || "", // REGON
                    telefon: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.telefon || "" : newAddress?.phone || "", // Phone
                    ulica: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.ulica || "" : newAddress?.street || "", // Street
                    miejscowosc: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.miejscowosc || "" : newAddress?.city || "", // City
                    kodPocztowy: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.kodPocztowy || "" : newAddress?.zipCode || "", // Zip Code
                    kraj: selectedAddress === 'existing' ? locations[selectedLocation]?.adresLocation?.kraj || "" : newAddress?.country || "" // Country
                }
            },
            data: new Date().toISOString(), // Current date
            opis: "string", // Add a description (if applicable)
            pozycjeDokHandlowego: cartItems.map(item => ({
                towarEnovaId: item.id, // Assuming item ID corresponds to the Enova ID
                name: i18n.language === "en"
                        ? item.productInfo?.englishTitle || item.name
                        : i18n.language === "de"
                            ? item.productInfo?.germanTitle || item.name
                            : item.name,
                ilosc: item.quantity, // Quantity
                cena: item.priceList?.find(p => p.nazwa === savedContractorName)?.netto || item.priceList?.find(p => p.nazwa === 'End User')?.netto, // Price
                wartosc: item.priceList?.find(p => p.nazwa === savedContractorName)?.netto * item.quantity || item.priceList?.find(p => p.nazwa === 'End User')?.netto * item.quantity, // Total value per item
                jednostka: "szt", // Add unit (if applicable)
                symbolWaluty: storedPriceCurrency // Add the currency symbol
            })),
            terminPlatnosci: selectedDate ? selectedDate.toISOString() : "", // Payment due date
        };


        // console.log(orderData);
        console.log(JSON.stringify(orderDataEnova));

        try {
            // const response = await fetch('https://se-europe-test.pl/api/orders', {
            const response = await fetch('https://se-europe-test.pl/api/enova_orders/enova_call', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDataEnova),
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

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Switch between 'existing' and 'new' address when changing tabs
        setSelectedAddress(newValue === 0 ? 'existing' : 'new');
    };

    const handleAddressChange = (field, value) => {
        setNewAddress((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };

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

    console.log(userDetails)


    const locations = userDetails?.enovaPerson?.contractor?.locations || [];

    return (
        <Container maxWidth="md" sx={{ mt: 4, marginBottom: 3 }}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>
            <Grid container spacing={4}>
                {/* User Information */}
                <Grid item xs={12} md={7}>
                    <Paper sx={{p: 3}} elevation={3}>
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
                        <Divider sx={{ my: 2 }} />
                        <Tabs value={value} onChange={handleChange} aria-label="address tabs">
                            <Tab label="Existing Address"/>
                            <Tab label="New Address"/>
                        </Tabs>
                        <br/>
                        {value === 0 && (
                            <Box>
                                {userDetails && (
                                    <>
                                        {/*/!* Main Address *!/*/}
                                        {/*<Typography variant="h6">Main Address</Typography>*/}
                                        {/*<Typography variant="body1">*/}
                                        {/*    <strong>Voivodeship:</strong> {userDetails?.enovaPerson?.contractor?.adres?.wojewodztwo || 'N/A'}*/}
                                        {/*</Typography>*/}
                                        {/*<Typography variant="body1">*/}
                                        {/*    <strong>Region:</strong> {userDetails?.enovaPerson?.contractor?.adres?.gmina || 'N/A'}*/}
                                        {/*</Typography>*/}
                                        {/*<Typography variant="body1">*/}
                                        {/*    <strong>Building Number:</strong> {userDetails?.enovaPerson?.contractor?.adres?.nrDomu || 'N/A'}*/}
                                        {/*</Typography>*/}
                                        {/*<Typography variant="body1">*/}
                                        {/*    <strong>Apartment Number:</strong> {userDetails?.enovaPerson?.contractor?.adres?.nrLokalu || 'N/A'}*/}
                                        {/*</Typography>*/}
                                        {/*<Typography variant="body1">*/}
                                        {/*    <strong>Post office:</strong> {userDetails?.enovaPerson?.contractor?.adres?.poczta || 'N/A'}*/}
                                        {/*</Typography>*/}
                                        {/*<Typography variant="body1">*/}
                                        {/*    <strong>District:</strong> {userDetails?.enovaPerson?.contractor?.adres?.powiat || 'N/A'}*/}
                                        {/*</Typography>*/}
                                        {/*<Typography variant="body1">*/}
                                        {/*    <strong>Street:</strong> {userDetails?.enovaPerson?.contractor?.adres?.ulica || 'N/A'}*/}
                                        {/*</Typography>*/}
                                        {/*<Typography variant="body1">*/}
                                        {/*    <strong>City:</strong> {userDetails?.enovaPerson?.contractor?.adres?.miejscowosc || 'N/A'}*/}
                                        {/*</Typography>*/}

                                        {/* Locations Dropdown */}
                                        {locations.length > 0 && (
                                            <FormControl fullWidth sx={{ mt: 2 }}>
                                                <InputLabel>Select Location</InputLabel>
                                                <Select
                                                    value={selectedLocation}
                                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                                    label="Select Location"
                                                >
                                                    {locations.map((location, index) => (
                                                        <MenuItem key={index} value={index}>
                                                            {location.nazwa || `Location ${index + 1}`}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}

                                        {/* Display Selected Location Address */}
                                        {selectedLocation !== "" && (
                                            <Box mt={2}>
                                                <Typography variant="h6">Selected Location Address</Typography>
                                                <Typography variant="body1">
                                                    <strong>Voivodeship:</strong> {locations[selectedLocation]?.adresLocation?.wojewodztwo || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Region:</strong> {locations[selectedLocation]?.adresLocation?.gmina || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Building Number:</strong> {locations[selectedLocation]?.adresLocation?.nrDomu || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Apartment Number:</strong> {locations[selectedLocation]?.adresLocation?.nrLokalu || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Post office:</strong> {locations[selectedLocation]?.adresLocation?.poczta || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>District:</strong> {locations[selectedLocation]?.adresLocation?.powiat || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Street:</strong> {locations[selectedLocation]?.adresLocation?.ulica || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>City:</strong> {locations[selectedLocation]?.adresLocation?.miejscowosc || 'N/A'}
                                                </Typography>
                                            </Box>
                                        )}
                                    </>
                                )}
                            </Box>
                        )}
                        {/* New Address Tab */}
                        {value === 1 && (
                            <Box>
                                {/*<Typography variant="h6" gutterBottom>*/}
                                {/*    New Address*/}
                                {/*</Typography>*/}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Voivodeship"
                                            fullWidth
                                            value={newAddress?.voivodeship || ""}
                                            onChange={(e) => handleAddressChange('voivodeship', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Region"
                                            fullWidth
                                            value={newAddress?.region || ""}
                                            onChange={(e) => handleAddressChange('region', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Building Number"
                                            fullWidth
                                            value={newAddress?.buildingNumber || ""}
                                            onChange={(e) => handleAddressChange('buildingNumber', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Apartment Number"
                                            fullWidth
                                            value={newAddress?.apartmentNumber || ""}
                                            onChange={(e) => handleAddressChange('apartmentNumber', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Post office"
                                            fullWidth
                                            value={newAddress?.postOffice || ""}
                                            onChange={(e) => handleAddressChange('postOffice', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="District"
                                            fullWidth
                                            value={newAddress?.district || ""}
                                            onChange={(e) => handleAddressChange('district', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Regon"
                                            fullWidth
                                            value={newAddress?.regon || ""}
                                            onChange={(e) => handleAddressChange('regon', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Phone"
                                            fullWidth
                                            value={newAddress?.phone || ""}
                                            onChange={(e) => handleAddressChange('phone', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Street"
                                            fullWidth
                                            value={newAddress?.street || ""}
                                            onChange={(e) => handleAddressChange('street', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="City"
                                            fullWidth
                                            value={newAddress?.city || ""}
                                            onChange={(e) => handleAddressChange('city', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Zip Code"
                                            fullWidth
                                            value={newAddress?.zipCode || ""}
                                            onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Country"
                                            fullWidth
                                            value={newAddress?.country || ""}
                                            onChange={(e) => handleAddressChange('country', e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                        <Divider sx={{ my: 2 }} />
                        <Textarea
                            minRows={2}
                            placeholder="Contact person"
                            fullWidth
                            sx={{marginBottom: "15px"}}
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                        />
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Select Date"
                                        value={selectedDate}
                                        onChange={(newDate) => setSelectedDate(newDate)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="My Order Number"
                                    fullWidth
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl>
                                    <RadioGroup
                                        value={selectedOption}
                                        onChange={handleCheckboxChange}
                                    >
                                        <FormControlLabel value="shipping" control={<Radio />} label="Shipping" />
                                        <FormControlLabel value="collection" control={<Radio />} label="Collection" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>

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
                        {/*<Box display="flex" justifyContent="space-between">*/}
                        {/*    <Typography>Tax (10%):</Typography>*/}
                        {/*    <Typography>{tax.toFixed(2)} {storedPriceCurrency}</Typography>*/}
                        {/*</Box>*/}
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
                            onClick={handleConfirmOpen} // Open confirmation popup
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Placing Order...' : 'Place Order'}
                        </Button>
                        {/* Confirmation Dialog Component */}
                        <ConfirmationDialog
                            open={openDialog}
                            onClose={handleConfirmClose}
                            onConfirm={handleConfirmSubmit}
                            title="Confirm Order"
                            message="Are you sure you want to place this order?"
                        />
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

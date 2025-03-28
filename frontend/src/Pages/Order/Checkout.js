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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import {FormHelperText} from "@mui/joy";
import {countries} from "../../utils/countries";
import {useTranslation} from "react-i18next";


// Zod Schema
const schema = z.object({
    selectedDate: z
        .date({ invalid_type_error: "Expected date but received none. Please select a valid date.", required_error: "Expected date but received none. Please select a valid date." })
        .min(new Date(), "Date cannot be in the past"),
    // orderNumber: z.string().min(1, "Order number is required"),
    selectedOption: z.enum(["shipping", "collection"], {
        errorMap: () => ({ message: "Please select either shipping or collection" }),
    }),
});

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
        nrDomu: '',
        nrLokalu: '',
        postOffice: '',
        district: '',
        regon: '',
        phone: '',
        ulica: '',
        miejscowosc: '',
        kodPocztowy: '',
        kraj: '',
    });

    const [locationDetails, setLocationDetails] = useState({
        nazwa: '',
    });

    const [selectedLocation, setSelectedLocation] = useState("");
    const [date, setDate] = useState(null);

    const [selectedOption, setSelectedOption] = useState(null);
    const [contactPerson, setContactPerson] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [orderNumber, setOrderNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState(false);
    const [dialogError, setDialogError] = useState(""); // State for dialog error message
    const { t } = useTranslation();


    const handleConfirmOpen = () => setOpenDialog(true);
    const handleConfirmClose = () => setOpenDialog(false);

    const handleConfirmSubmit = () => {
        // Validate form fields using Zod
        // const validationResult = schema.safeParse({
        //     selectedDate,
        //     orderNumber,
        //     selectedOption
        // });
        //
        // if (!validationResult.success) {
        //     alert(validationResult.error.issues.map(issue => issue.message).join("\n"));
        //     return; // Stop submission if validation fails
        // }
        if (!selectedOption) {
            setError(true); // Set error state if no option is selected
            setDialogError("Please select either shipping or collection");

            return;
        }
        setDialogError(""); // Clear error if selection is valid

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
                            `https://seequipment.pl/api/user_enovas?email=${encodeURIComponent(email)}`,
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

    console.log(userDetails?.enovaPerson)

    console.log(userDetails?.enovaPerson?.contractor?.idEnova)
    const contractorId = userDetails?.enovaPerson?.contractor?.idEnova
    const contractorPersonId = userDetails?.enovaPerson?.id

    console.log(userDetails?.enovaPerson?.contractor?.idEnova)
    const contractorLocationId = userDetails?.enovaPerson?.contractor?.locations[selectedLocation]?.id
    const contractorLocationKod = userDetails?.enovaPerson?.contractor?.locations[selectedLocation]?.kod
    const contractorLocationNazwa = userDetails?.enovaPerson?.contractor?.locations[selectedLocation]?.nazwa

    console.log('Current localStorage:', localStorage);
    console.log('Current localStorage:', userEmail);

    const savedContractorName = localStorage.getItem('contractorName');

    console.log(Math.floor(Date.now() / 1000)); // Example: 1709456734123

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            // selectedDate: new Date(),
            // selectedOption: undefined,
        },
    });

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

        // let currentIdWWW = 21; // Starting from 7

        const orderDataEnova = {
            idWWW: Math.floor(Date.now() / 1000), // Assuming this is an auto-increment or placeholder value
            idEnova: 112250, // Assuming this is an auto-increment or placeholder value
            email: userDetails?.enovaPerson?.email, // Assuming this is an auto-increment or placeholder value
            idOsobaKontaktowa: userDetails.id,
            idPlatnosciInternetowej: "string", // Add the payment method ID as a string
            numerWWW: "numer WWW", // Add the WWW number (order number)
            numerZamowieniaKontrahenta: orderNumber, // Add the WWW number (order number)
            numerEnova: "SE/000005/9", // Add the Enova number (order reference)
            czyOdbiorWlasny: selectedOption === "shipping",
            wartosc: total, // Assuming total is the total order value
            wartoscWaluta: total, // Assuming the same value for currency (can be adjusted if needed)
            platnik: contractorId, // Assuming the payer ID (if applicable)
            odbiorca: contractorId, // Assuming the recipient ID (if applicable)
            lokalizacjaDostawy: {
                kod: contractorLocationKod, // Add a string for location code
                nazwa: selectedAddress === 'existing' ? locations[selectedLocation]?.nazwa || "" : locationDetails?.nazwa || "", // Voivodeship
                eMail: userDetails?.enovaPerson?.email, // Add email from user details
                nazwaOdbierajacego: contactPerson,
                id: contractorLocationId, // Assuming the location ID (can be adjusted if applicable)
                // idWWW: 0, // Assuming this is a placeholder or related to the order
                adres: {
                    id: "1",
                    wojewodztwo: selectedAddress === 'existing' ? locations[selectedLocation]?.adres?.wojewodztwo || "" : newAddress?.voivodeship || "", // Voivodeship
                    gmina: selectedAddress === 'existing' ? locations[selectedLocation]?.adres?.gmina || "" : newAddress?.region || "", // Region
                    nrDomu: selectedAddress === 'existing' ? locations[selectedLocation]?.adres?.nrDomu || "" : newAddress?.nrDomu || "", // Building number
                    nrLokalu: selectedAddress === 'existing' ? locations[selectedLocation]?.adres?.nrLokalu || "" : newAddress?.nrLokalu || "", // Apartment number
                    poczta: selectedAddress === 'existing' ? locations[selectedLocation]?.adres?.poczta || "" : newAddress?.postOffice || "", // Post office
                    powiat: selectedAddress === 'existing' ? locations[selectedLocation]?.adres?.powiat || "" : newAddress?.district || "", // District
                    regon: selectedAddress === 'existing' ? locations[selectedLocation]?.adres?.Regon || "" : newAddress?.regon || "", // REGON
                    telefon: phone, // Phone
                    ulica: selectedAddress === 'existing' ? locations[selectedLocation]?.adres?.ulica || "" : newAddress?.ulica || "", // Street
                    miejscowosc: selectedAddress === 'existing' ? locations[selectedLocation]?.adres?.miejscowosc || "" : newAddress?.miejscowosc || "", // City
                    kodPocztowy: selectedAddress === 'existing' ? locations[selectedLocation]?.adres?.kodPocztowy || "" : newAddress?.kodPocztowy || "", // Zip Code
                    kraj: selectedAddress === 'existing' ? locations[selectedLocation]?.adres?.kraj || "" : newAddress?.kraj || "" // Country
                }
            },
            data: new Date().toISOString(), // Current date
            dataDostawy: selectedDate ? selectedDate.toISOString() : "", // Payment due date
            opis: "string", // Add a description (if applicable)
            pozycjeDokHandlowego: cartItems.map(item => ({
                towarEnovaId: item.id, // Assuming item ID corresponds to the Enova ID
                enovaProduct: {
                    id: item.id // Assuming item ID corresponds to the Enova ID
                },
                productName: i18n.language === "en"
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
            contactPerson: contactPerson, //
            phone: phone, //
            orderNumber: orderNumber,
            shipping: selectedOption,
        };


        // console.log(orderData);
        console.log(JSON.stringify(orderDataEnova));

        try {
            // const response = await fetch('https://seequipment.pl/api/orders', {
            const response = await fetch('https://seequipment.pl/api/enova_orders/enova_call', {
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

    const handleLocationChange = (field, value) => {
        setLocationDetails((prevState) => ({
            ...prevState,
            [field]: value
        }));
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

    console.log(userDetails)

    return (
        <Container maxWidth="md" sx={{ mt: 4, marginBottom: 3 }}>
            <Typography variant="h4" gutterBottom>
                {t("checkout.title")}
            </Typography>
            <Grid container spacing={4}>
                {/* User Information */}
                <Grid item xs={12} md={7}>
                    <Paper sx={{p: 3}} elevation={3}>
                        <Typography variant="h6" gutterBottom>
                            {t("checkout.personalInfo")}
                        </Typography>
                        <Box>
                            <Typography variant="body1">
                                <strong>{t("checkout.email")}:</strong> {userDetails?.enovaPerson?.email}
                            </Typography>
                            {userDetails && (
                                <>
                                    <Typography variant="body1">
                                        <strong>{t("checkout.name")}:</strong> {userDetails?.enovaPerson?.imie || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>{t("checkout.surname")}:</strong> {userDetails?.enovaPerson?.nazwisko || 'N/A'}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>{t("checkout.phone")}:</strong> {userDetails?.enovaPerson?.telKomorkowy || 'N/A'}
                                    </Typography>
                                </>
                            )}
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Tabs value={value} onChange={handleChange} aria-label="address tabs">
                            <Tab label={t("checkout.existingAddress")} />
                            <Tab label={t("checkout.newAddress")} />
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
                                                <InputLabel>{t("checkout.selectLocation")}</InputLabel>
                                                <Select
                                                    value={selectedLocation}
                                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                                    label={t("checkout.selectLocation")}
                                                >
                                                    {locations.map((location, index) => (
                                                        <MenuItem key={index} value={index} sx={{ display: "flex", justifyContent: "space-between" }}>
                                                            <span>{location.nazwa || `${t("checkout.location")} ${index + 1}`}</span>
                                                            <span style={{ marginLeft: "auto" }}>{location?.adres?.miejscowosc || ``}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                        {/* Display Selected Location Address */}
                                        {selectedLocation !== "" && (
                                            <Box mt={2}>
                                                <Typography variant="h6">{t("checkout.selectedLocationAddress")}</Typography>
                                                {locations[selectedLocation]?.adres?.ulica &&
                                                    locations[selectedLocation]?.adres?.ulica !== "N/A" && (
                                                        <Typography variant="body1">
                                                            <strong>{t("checkout.street")}:</strong> {locations[selectedLocation]?.adres?.ulica}
                                                        </Typography>
                                                    )}
                                                {locations[selectedLocation]?.adres?.nrDomu &&
                                                    locations[selectedLocation]?.adres?.nrDomu !== "N/A" && (
                                                        <Typography variant="body1">
                                                            <strong>{t("checkout.buildingNumber")}:</strong> {locations[selectedLocation]?.adres?.nrDomu}
                                                        </Typography>
                                                    )}
                                                {locations[selectedLocation]?.adres?.nrLokalu &&
                                                    locations[selectedLocation]?.adres?.nrLokalu !== "N/A" && (
                                                        <Typography variant="body1">
                                                            <strong>{t("checkout.apartmentNumber")}:</strong> {locations[selectedLocation]?.adres?.nrLokalu}
                                                        </Typography>
                                                    )}
                                                {locations[selectedLocation]?.adres?.kodPocztowy &&
                                                    locations[selectedLocation]?.adres?.kodPocztowy !== "N/A" && (
                                                        <Typography variant="body1">
                                                            <strong>{t("checkout.zipCode")}:</strong> {locations[selectedLocation]?.adres?.kodPocztowy}
                                                        </Typography>
                                                    )}
                                                {locations[selectedLocation]?.adres?.miejscowosc &&
                                                    locations[selectedLocation]?.adres?.miejscowosc !== "N/A" && (
                                                        <Typography variant="body1">
                                                            <strong>{t("checkout.city")}:</strong> {locations[selectedLocation]?.adres?.miejscowosc}
                                                        </Typography>
                                                    )}
                                                {locations[selectedLocation]?.adres?.kraj &&
                                                    locations[selectedLocation]?.adres?.kraj !== "N/A" && (
                                                        <Typography variant="body1">
                                                            <strong>{t("checkout.country")}:</strong> {locations[selectedLocation]?.adres?.kraj}
                                                        </Typography>
                                                    )}
                                            </Box>
                                        )}

                                    </>
                                )}
                            </Box>
                        )}
                        {/* New Address Tab */}
                        {value === 1 && (
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label={t('checkout.companyName')}
                                            fullWidth
                                            value={locationDetails?.nazwa || ""}
                                            onChange={(e) => handleLocationChange('nazwa', e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label={t('checkout.street')}
                                            fullWidth
                                            value={newAddress?.ulica || ""}
                                            onChange={(e) => handleAddressChange('ulica', e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label={t('checkout.buildingNumber')}
                                            fullWidth
                                            value={newAddress?.nrDomu || ""}
                                            onChange={(e) => handleAddressChange('nrDomu', e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label={t('checkout.apartmentNumber')}
                                            fullWidth
                                            value={newAddress?.nrLokalu || ""}
                                            onChange={(e) => handleAddressChange('nrLokalu', e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label={t('checkout.zipCode')}
                                            fullWidth
                                            value={newAddress?.kodPocztowy || ""}
                                            onChange={(e) => handleAddressChange('kodPocztowy', e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label={t('checkout.city')}
                                            fullWidth
                                            value={newAddress?.miejscowosc || ""}
                                            onChange={(e) => handleAddressChange('miejscowosc', e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="country-label">{t('checkout.country')}</InputLabel>
                                            <Select
                                                labelId="country-label"
                                                label={t('checkout.country')}
                                                value={newAddress?.kraj || ""}
                                                onChange={(e) => handleAddressChange('kraj', e.target.value)}
                                            >
                                                {countries.map((country) => (
                                                    <MenuItem key={country.code} value={country.code}>
                                                        {country.name} ({country.code})
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                        <Divider sx={{ my: 2 }} />
                        <Textarea
                            minRows={2}
                            placeholder={t('checkout.contactPerson')}
                            fullWidth
                            sx={{ marginBottom: "15px" }}
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label={t('checkout.phone')}
                                    fullWidth
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Grid>

                            {/* DatePicker */}
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label={t('checkout.selectDate')}
                                        value={selectedDate}
                                        onChange={(newDate) => setSelectedDate(newDate)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={t('checkout.myOrderNumber')}
                                    fullWidth
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                />
                            </Grid>

                            {/* Radio Group */}
                            <Grid item xs={12} sm={6}>
                                <FormControl error={!selectedOption}>
                                    <RadioGroup value={selectedOption} onChange={handleCheckboxChange}>
                                        <FormControlLabel value="shipping" control={<Radio />} label={t('checkout.shipping')} />
                                        <FormControlLabel value="collection" control={<Radio />} label={t('checkout.collection')} />
                                    </RadioGroup>
                                    {!selectedOption && <FormHelperText>{t('checkout.selectOption')}</FormHelperText>}
                                </FormControl>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>

                {/* Order Summary */}
                <Grid item xs={12} md={5}>
                    <Paper sx={{ p: 3 }} elevation={3}>
                        <Typography variant="h6" gutterBottom>
                            {t('checkout.orderSummary')}
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
                            <Typography>{t('cart.subtotal')}:</Typography>
                            <Typography>{subtotal.toFixed(2)} {storedPriceCurrency}</Typography>
                        </Box>
                        {/*<Box display="flex" justifyContent="space-between">*/}
                        {/*    <Typography>Tax (10%):</Typography>*/}
                        {/*    <Typography>{tax.toFixed(2)} {storedPriceCurrency}</Typography>*/}
                        {/*</Box>*/}
                        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                            <Typography variant="h6">{t('cart.total')}:</Typography>
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
                            {isSubmitting ? t('checkout.placingOrder') : t('checkout.placeOrder')}
                        </Button>

                        {/* Confirmation Dialog Component */}
                        <ConfirmationDialog
                            open={openDialog}
                            onClose={handleConfirmClose}
                            onConfirm={handleConfirmSubmit}
                            title={t('checkout.confirmOrderTitle')}
                            message={t('checkout.confirmOrderMessage')}
                            errorMessage={dialogError} // Pass error message to dialog
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
                    {t('cart.return')}
                </Button>
            </Box>
        </Container>
    );
};

export default Checkout;

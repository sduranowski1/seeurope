import React, {useState, useEffect, useCallback} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    CircularProgress,
    Typography, IconButton
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import {fetchToken} from "../../utils/fetchToken";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import CustomTableHead from "../../Components/AdminTableHead/CustomTableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomCheckbox from "../../Components/AdminCheckbox/CustomCheckbox";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

const EnovaProductEdit = () => {
    const { id } = useParams();  // Get the id from the route parameter
    const [token, setToken] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the token first
                // const token = await fetchToken();
                // setToken(token);

                // Use the token to fetch the actual data
                // const response = await fetch('https://seequipment.pl/api/PanelWWW_API/DajLudziKontrahentaWgId', {
                const response = await fetch(`https://seequipment.pl/api/enova_people/${id}`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify({
                    //     parametr: id,
                    // }),
                });


                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }

                const result = await response.json();
                setData(result);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // Empty dependency array to run only once on mount

    const renderDetails = (data) => {
        const details = {
            '% wzrostu': data.procWzrostu,
            'Capacity': data.capacity,
            'Części zamienne': data.replacementParts ? 'True' : 'False',
            'DDP PL': data.ddpPl ? 'True' : 'False',
            'Producent': data.producent,
            // Add more fields as required
        };

        return Object.entries(details).map(([key, value]) => (
            <TableRow key={key}>
                <TableCell sx={{ fontWeight: 'bold' }}>{key}</TableCell>
                <TableCell>{value || 'N/A'}</TableCell>
            </TableRow>
        ));
    };

    // const renderPrices = (product) => {
    //     // Define the desired price names
    //     const desiredPrices = [
    //         'OEM PLN',
    //         'OEM EUR',
    //         'PRO PLN',
    //         'PRO EUR',
    //         'HAN EUR',
    //         'HAN PLN',
    //         'Dealer Detal',
    //         'Volvo PL',
    //         'Volvo EUR',
    //         'End Submission',
    //     ];
    //
    //     // Map through desiredPrices and fetch matching price objects
    //     const prices = desiredPrices.map((priceName) => {
    //         const matchedPrice = product.listaCen.find((price) => price.nazwa === priceName);
    //         return {
    //             nazwa: priceName,
    //             netto: matchedPrice ? matchedPrice.netto : null,
    //             waluta: matchedPrice ? matchedPrice.waluta : 'N/A',
    //         };
    //     });
    //
    //     // Render table rows dynamically
    //     return prices.map((price, index) => (
    //         <TableRow key={index}>
    //             <TableCell>{price.waluta}</TableCell>
    //             <TableCell>{price.netto ? `${price.netto}` : 'N/A'}</TableCell>
    //             <TableCell>{price.nazwa}</TableCell>
    //         </TableRow>
    //     ));
    // };


    if (!data) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh" // Or use specific height if you want it in a smaller area
                width="100%"
            >
                <CircularProgress />
            </Box>
        );
    };

    return (
        <div>
            {loading && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgcolor="rgba(255, 255, 255, 0.7)"
                >
                    <CircularProgress />
                </Box>
            )}

            {!loading && error && (
                <Box sx={{ color: 'red', textAlign: 'center', padding: 2 }}>
                    {error}
                </Box>
            )}

            {!loading && data ? (
                <div>
                    <TableContainer component={Paper} sx={{position: 'relative', marginTop: "15px"}}>

                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Id</TableCell>
                                    <TableCell>{data.id || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
                                    <TableCell>{data.imie || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Surname</TableCell>
                                    <TableCell>{data.nazwisko || 'N/A'}</TableCell>
                                </TableRow>
                                {/*<TableRow>*/}
                                {/*    <TableCell sx={{ fontWeight: 'bold' }}>% Increase</TableCell>*/}
                                {/*    <TableCell>{data.procWzrostu || 'N/A'}</TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                {/*    <TableCell sx={{ fontWeight: 'bold' }}>Replacement Parts</TableCell>*/}
                                {/*    <TableCell>{data.replacementParts || 'N/A'}</TableCell>*/}
                                {/*</TableRow>*/}
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Role</TableCell>
                                    <TableCell>{data.stanowisko || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Company Email</TableCell>
                                    <TableCell>{data.email || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Phone Number</TableCell>
                                    <TableCell>{data.telKomorkowy || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Website Access</TableCell>
                                    <TableCell>{data.dostepDoWWW ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Permission to order</TableCell>
                                    <TableCell>{data.prawoDoZamowien ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>


                    </TableContainer>

                    {/*<Typography variant="h5" component="h5" sx={{marginTop: "20px"}}>Attributes</Typography>*/}
                    {/*<TableContainer component={Paper} sx={{position: 'relative', marginTop: "15px"}}>*/}
                    {/*    <Table>*/}
                    {/*        /!*<CustomTableHead>*!/*/}
                    {/*        /!*    <TableRow>*!/*/}
                    {/*        /!*        <TableCell>Name</TableCell>*!/*/}
                    {/*        /!*        <TableCell>Value</TableCell>*!/*/}
                    {/*        /!*    </TableRow>*!/*/}
                    {/*        /!*</CustomTableHead>*!/*/}
                    {/*        <TableBody>*/}
                    {/*            /!* Render Details Section *!/*/}
                    {/*            {renderDetails(data)}*/}
                    {/*        </TableBody>*/}
                    {/*    </Table>*/}
                    {/*</TableContainer>*/}

                    {/*<Typography variant="h5" component="h5" sx={{marginTop: "20px"}}>Prices</Typography>*/}
                    {/*<TableContainer component={Paper} sx={{position: 'relative', marginTop: "15px"}}>*/}
                    {/*    <Table>*/}
                    {/*        <CustomTableHead>*/}
                    {/*            <TableRow>*/}
                    {/*                <TableCell>Currency</TableCell>*/}
                    {/*                <TableCell>Netto</TableCell>*/}
                    {/*                <TableCell>Name</TableCell>*/}
                    {/*            </TableRow>*/}
                    {/*        </CustomTableHead>*/}
                    {/*        <TableBody>*/}
                    {/*            /!* Render Details Section *!/*/}
                    {/*            {renderPrices(data)}*/}
                    {/*        </TableBody>*/}
                    {/*    </Table>*/}
                    {/*</TableContainer>*/}
                </div>
            ) : (
                <p>Loading data...</p>
    )}
</div>
    );
};

export default EnovaProductEdit;

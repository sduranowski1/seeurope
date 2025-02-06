import React, {useState, useEffect, useCallback} from 'react';
import {
    Box,
    CircularProgress,
    Typography,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableContainer, Grid
} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import {Edit} from "react-admin";

const EnovaContractorEdit = () => {
    const {id} = useParams(); // Get the product ID from the URL
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://se-europe-test.pl/api/enova_contractors/${id}`);
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleRowClick = useCallback((productId) => {
        navigate(`/admin/enova_people/${productId}`);
    }, [navigate]);

    {/* Do not remove! The Edit tag is for security */}
    if (loading) {
        return (
            <Edit>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                    width="100%"
                >
                    <CircularProgress />
                </Box>
            </Edit>
        );
    }
    {/* Do not remove! The Edit tag is for security */}

    if (error) {
        return (
            <Box sx={{ color: 'red', textAlign: 'center', padding: 2 }}>
                {error}
            </Box>
        );
    }

    return (
        <Box sx={{ padding: '20px' }}>
            {/* Main Contractor Details */}
            <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                            <TableCell>{data.idEnova || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Kod</TableCell>
                            <TableCell>{data.kod || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nazwa</TableCell>
                            <TableCell>{data.nazwa || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell>{data.Email || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Cena kontrahenta</TableCell>
                            <TableCell>{data.cenaKontrahentaNazwa || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Telefon</TableCell>
                            <TableCell>{data.Telefon || 'N/A'}</TableCell>
                        </TableRow>
                        {/* Address Details */}
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                            <TableCell>
                                {data.adres
                                    ? `${data.adres.ulica || 'N/A'}, ${data.adres.nrDomu || 'N/A'}, ${data.adres.miejscowosc || 'N/A'}`
                                    : 'N/A'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Postal Code</TableCell>
                            <TableCell>{data.adres?.kodPocztowy || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Country</TableCell>
                            <TableCell>{data.adres?.kraj || 'N/A'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Inline Tables for Locations and People */}
            <Grid container spacing={2}>
                {/* Locations Table */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                        Locations
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {data.locations?.length > 0 ? (
                                    data.locations.map((loc, index) => (
                                        <Box key={index} sx={{  padding: 2 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                {loc.nazwa || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2">
                                                {loc.adresLocation
                                                    ? `${loc.adresLocation.ulica || 'N/A'}, ${
                                                        loc.adresLocation.nrDomu || 'N/A'
                                                    }, ${loc.adresLocation.miejscowosc || 'N/A'}`
                                                    : 'N/A'}
                                            </Typography>
                                            <hr/>
                                        </Box>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2} sx={{ textAlign: 'center' }}>
                                            No Locations Available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* People Table */}

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                        People
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {data.listaOsobyKontrahenta?.length > 0 ? (
                                    data.listaOsobyKontrahenta.map((person, index) => (
                                        // <TableRow key={index}>
                                        //     <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                        //     <TableCell>
                                        //         {person.imie} {person.nazwisko}
                                        //     </TableCell>
                                        // </TableRow>
                                        // <Box key={index} sx={{padding: 2}}>
                                        <TableRow key={index}
                                                     onClick={() => handleRowClick(person.id)}
                                                     sx={{
                                                         cursor: 'pointer',
                                                         '&:hover': {
                                                             backgroundColor: '#f0f0f0',
                                                         },
                                                     }}>
                                            {/*<TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>*/}
                                            <TableCell>{person.imie} {person.nazwisko}</TableCell>
                                        </TableRow>
                                            // <Typography key={index}  sx={{ fontWeight: 'bold' }} variant="body2">
                                            //     {person.imie} {person.nazwisko}
                                            // </Typography>
                                        //     <hr/>
                                        // </Box>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2} sx={{textAlign: 'center'}}>
                                            No People Available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>



            </Grid>
        </Box>
    );
};

export default EnovaContractorEdit;

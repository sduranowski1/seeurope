import React, {useEffect, useState} from 'react';
import sketch from "../../../assets/100838.png";
import {fetchToken} from "../../../utils/fetchToken";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Box, CircularProgress, Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import CustomTableHead from "../../../Components/AdminTableHead/CustomTableHead";

export const ProductDescription = ({ product }) => {
    const [token, setToken] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the token first
                const token = await fetchToken();
                setToken(token);

                // Use the token to fetch the actual data
                const response = await fetch('https://se-europe-test.pl/api/PanelWWW_API/DajTowarWgKod', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        parametr: product.kod,
                    }),
                });


                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }

                const result = await response.json();
                console.log(result)
                setData(result);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [product.kod]); // Empty dependency array to run only once on mount

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

    const renderPrices = (product) => {
        // Define the desired price names
        const desiredPrices = [
            'OEM PLN',
            'OEM EUR',
            'PRO PLN',
            'PRO EUR',
            'HAN EUR',
            'HAN PLN',
            'Dealer Detal',
            'Volvo PL',
            'Volvo EUR',
            'End User',
        ];

        // Map through desiredPrices and fetch matching price objects
        const prices = desiredPrices.map((priceName) => {
            const matchedPrice = product.listaCen.find((price) => price.nazwa === priceName);
            return {
                nazwa: priceName,
                netto: matchedPrice ? matchedPrice.netto : null,
                waluta: matchedPrice ? matchedPrice.waluta : 'N/A',
            };
        });

        // Render table rows dynamically
        return prices.map((price, index) => (
            <TableRow key={index}>
                <TableCell>{price.waluta}</TableCell>
                <TableCell>{price.netto ? `${price.netto}` : 'N/A'}</TableCell>
                <TableCell>{price.nazwa}</TableCell>
            </TableRow>
        ));
    };


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
    }

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
                    <CircularProgress/>
                </Box>
            )}

            {!loading && error && (
                <Box sx={{color: 'red', textAlign: 'center', padding: 2}}>
                    {error}
                </Box>
            )}

            {!loading && data ? (
                <div>
                    <section className={'section-contrains tables-page item-page'}>
                        <div>
                            <h1>{data.nazwa}</h1>
                            <p>{data.kod}</p>
                            <br></br>
                            <h2>Adapter do ciągnika</h2>
                            <br></br>
                            <p>Z adapterem od SE Equipment oszczędzasz zarówno czas, jak i pieniądze.</p>
                            <br></br>
                            <p>SE Equipment oferuje proste rozwiązanie, które sprawi, że Twoja praca będzie bardziej
                                efektywna.
                                Dzięki naszemu adapterowi z mocowaniem 3-punktowym kat 2 po stronie maszyny i SMS/Euro
                                po
                                stronie osprzętu, masz możliwość zamontowania jednego osprzętu z innym złączem niż to,
                                do
                                którego maszyna jest przystosowana. Z naszym adapterem nie musisz ponosić dodatkowych
                                kosztów
                                związanych z zakupem nowego sprzętu lub nowej maszyny.</p>
                            <br></br>
                            <p>Prezentujemy nasze adaptery w dużej różnorodności i w wielu różnych kombinacjach, ale
                                wszystkie
                                są produkowane z solidną ramą, aby wytrzymać cięższe obciążenia. Jeśli masz zadanie, w
                                którym
                                często musisz przełączać się między różnymi urządzeniami, nasz adapter jest optymalnym
                                rozwiązaniem.</p>
                            <br></br>
                            <h3>Korzyści:</h3>
                            <ul>
                                <li>Proste rozwiązanie dla bardziej efektywnej pracy</li>
                                <li>Uniknięcie zakupu nowej maszyny lub sprzętu</li>
                                <li>Wiele różnych modeli</li>
                            </ul>
                            <br></br>
                            <h3>DANE TECHNICZNE</h3>
                            <ul>
                                <li>Capacity: {data.capacityFeat}</li>
                                <li>Szerokość: 1134 mm</li>
                                <li>Wysokość: 781 mm</li>
                                <li>Waga: 87 kg</li>
                                <li>Mocowanie: 3 punktowe</li>
                                <li>Strona maszyny: 3 punktowe Kat 2</li>
                                <li>Strona osprzętu: SMS/Euro</li>
                                <li>Produkt: Adapter</li>
                            </ul>
                            <div className='price-container'>
                                <h2>899.99$</h2>
                            </div>
                            <div className={'item-quantity'}>
                                <button className='quantity-btn'>-</button>
                                <p>0</p>
                                <button className='quantity-btn'>+</button>
                                <button className='buy-btn btn-container'>BUY</button>

                            </div>
                            <h2>{data.stanMagazynowy}</h2>
                        </div>
                        <div>
                            <img src={sketch}/>
                            <img src={data.stanMagazynowy}/>
                        </div>
                    </section>
                    <TableContainer component={Paper} sx={{position: 'relative', marginTop: "15px"}}>

                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Id</TableCell>
                                    <TableCell>{data.id || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Product Name</TableCell>
                                    <TableCell>{data.nazwa || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Code</TableCell>
                                    <TableCell>{data.kod || 'N/A'}</TableCell>
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
                                    <TableCell sx={{fontWeight: 'bold'}}>Unit</TableCell>
                                    <TableCell>{data.jednostka || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Quantity</TableCell>
                                    <TableCell>{data.Ilosc || 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{fontWeight: 'bold'}}>Availability</TableCell>
                                    <TableCell>{data.stanMagazynowy || 'N/A'}</TableCell>
                                </TableRow>
                                {/*<TableRow>*/}
                                {/*    <TableCell sx={{ fontWeight: 'bold' }}>Price (Netto)</TableCell>*/}
                                {/*    <TableCell>{data.netto || 'N/A'}</TableCell>*/}
                                {/*</TableRow>*/}
                            </TableBody>
                        </Table>


                    </TableContainer>

                    <Typography variant="h5" component="h5" sx={{marginTop: "20px"}}>Attributes</Typography>
                    <TableContainer component={Paper} sx={{position: 'relative', marginTop: "15px"}}>
                        <Table>
                            {/*<CustomTableHead>*/}
                            {/*    <TableRow>*/}
                            {/*        <TableCell>Name</TableCell>*/}
                            {/*        <TableCell>Value</TableCell>*/}
                            {/*    </TableRow>*/}
                            {/*</CustomTableHead>*/}
                            <TableBody>
                                {/* Render Details Section */}
                                {renderDetails(data)}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="h5" component="h5" sx={{marginTop: "20px"}}>Prices</Typography>
                    <TableContainer component={Paper} sx={{position: 'relative', marginTop: "15px"}}>
                        <Table>
                            <CustomTableHead>
                                <TableRow>
                                    <TableCell>Currency</TableCell>
                                    <TableCell>Netto</TableCell>
                                    <TableCell>Name</TableCell>
                                </TableRow>
                            </CustomTableHead>
                            <TableBody>
                                {/* Render Details Section */}
                                {renderPrices(data)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};
//     return (
//         <div>
//             <section className={'section-contrains tables-page item-page'}>
//                 <div>
//                     <h1>ADAPTER 3-PUNKTOWY DO SMS/EURO MECH</h1>
//                     <p>SE100838</p>
//                     <p>
//                         <strong>Kod:</strong> {product.kod}
//                     </p>
//                     <br></br>
//                     <h2>Adapter do ciągnika</h2>
//                     <br></br>
//                     <p>Z adapterem od SE Equipment oszczędzasz zarówno czas, jak i pieniądze.</p>
//                     <br></br>
//                     <p>SE Equipment oferuje proste rozwiązanie, które sprawi, że Twoja praca będzie bardziej efektywna.
//                         Dzięki naszemu adapterowi z mocowaniem 3-punktowym kat 2 po stronie maszyny i SMS/Euro po
//                         stronie osprzętu, masz możliwość zamontowania jednego osprzętu z innym złączem niż to, do
//                         którego maszyna jest przystosowana. Z naszym adapterem nie musisz ponosić dodatkowych kosztów
//                         związanych z zakupem nowego sprzętu lub nowej maszyny.</p>
//                     <br></br>
//                     <p>Prezentujemy nasze adaptery w dużej różnorodności i w wielu różnych kombinacjach, ale wszystkie
//                         są produkowane z solidną ramą, aby wytrzymać cięższe obciążenia. Jeśli masz zadanie, w którym
//                         często musisz przełączać się między różnymi urządzeniami, nasz adapter jest optymalnym
//                         rozwiązaniem.</p>
//                     <br></br>
//                     <h3>Korzyści:</h3>
//                     <ul>
//                         <li>Proste rozwiązanie dla bardziej efektywnej pracy</li>
//                         <li>Uniknięcie zakupu nowej maszyny lub sprzętu</li>
//                         <li>Wiele różnych modeli</li>
//                     </ul>
//                     <br></br>
//                     <h3>DANE TECHNICZNE</h3>
//                     <ul>
//                         <li>Udźwig: 2500 kg</li>
//                         <li>Szerokość: 1134 mm</li>
//                         <li>Wysokość: 781 mm</li>
//                         <li>Waga: 87 kg</li>
//                         <li>Mocowanie: 3 punktowe</li>
//                         <li>Strona maszyny: 3 punktowe Kat 2</li>
//                         <li>Strona osprzętu: SMS/Euro</li>
//                         <li>Produkt: Adapter</li>
//                     </ul>
//                     <div className='price-container'>
//                         <h2>899.99$</h2>
//                     </div>
//                     <div className={'item-quantity'}>
//                         <button className='quantity-btn'>-</button>
//                         <p>0</p>
//                         <button className='quantity-btn'>+</button>
//                         <button className='buy-btn btn-container'>BUY</button>
//                     </div>
//                 </div>
//                 <div>
//                     <img src={sketch}/>
//                 </div>
//             </section>
//         </div>
//     );
// };
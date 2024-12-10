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
import DOMPurify from 'dompurify';

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

            <ul className='price-container' key={index}>
                <li>{price.waluta} {price.netto ? `${price.netto}` : 'N/A'} {price.nazwa}</li>
                {/*<li>{price.netto ? `${price.netto}` : 'N/A'}</li>*/}
                {/*<li>{price.nazwa}</li>*/}
            </ul>
    ));
    };

    const renderFeatures = (product) => {
        // Define the desired price names
        const featuresList = [
            'Capacity',
            'Depth',
            'Dimension',
            'Equipment side',
            'Exisiting fork',
            'Height',
            'Information',
            'Length',
            'Machine side',
            'Masa do',
            'Masa od',
            'Model',
            'More information',
            'My Machine',
            'OPIS WC',
            'Product',
            "Recommended Machine weight",
            "Type",
            "Variant",
            "Volume",
            "WC_OutOfStock",
            "WC_prodID",
            "WC_Ukryty",
            "Weight",
            "Width"
        ];

        // Map through desiredPrices and fetch matching price objects
        const features = featuresList.map((featureName) => {
            const matchedFeature = product.listaCechy.find((feature) => feature.nazwa === featureName);
            return {
                nazwa: featureName,
                wartosc: matchedFeature ? matchedFeature.wartosc : null,
                // waluta: matchedPrice ? matchedPrice.waluta : 'N/A',
            };
        });

        // Render table rows dynamically
        return features.map((feature, index) => (

            <ul className='price-container' key={index}>
                <li>{feature.nazwa}: {feature.wartosc ? `${feature.wartosc}` : 'N/A'} </li>
                {/*<li>{price.netto ? `${price.netto}` : 'N/A'}</li>*/}
                {/*<li>{price.nazwa}</li>*/}
            </ul>
        ));
    };


    if (!data) {
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

    const description = data.productInfo?.description;
    const sanitizedDescription = DOMPurify.sanitize(description);

    const polishDescription = data.productInfo?.polishDescription;
    const sanitizedPolishDescription = DOMPurify.sanitize(polishDescription);

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
                                <h1>{data.nazwa || "'N/A"}</h1>
                                <p>{data.kod}</p>
                                {/*<p>{String(data.productInfo?.description || 'No description')}</p>*/}
                                <div dangerouslySetInnerHTML={{
                                    __html: sanitizedDescription || 'No description available'
                                }}
                                />
                                <div dangerouslySetInnerHTML={{
                                    __html: sanitizedPolishDescription || 'Brak opisu'
                                }}
                                />
                                {data.productInfo?.polishDescription}
                                {/*<br></br>*/}
                                {/*<h2>Nagłówek produktu</h2>*/}
                                {/*<br/>*/}
                                {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt*/}
                                {/*    ut labore et dolore magna aliqua.</p>*/}
                                {/*<br/>*/}
                                {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in*/}
                                {/*    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur*/}
                                {/*    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id*/}
                                {/*    est laborum.</p>*/}
                                {/*<br/>*/}
                                {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet est et sapien*/}
                                {/*    ullamcorper pharetra. Nulla at augue ac arcu cursus vehicula. Fusce volutpat dolor a*/}
                                {/*    metus tincidunt vehicula. Phasellus mollis, justo et iaculis varius, sem metus lacinia*/}
                                {/*    ex, eu volutpat elit tortor vitae libero.</p>*/}
                                {/*<br/>*/}
                                {/*<h3>Korzyści:</h3>*/}
                                {/*<ul>*/}
                                {/*    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>*/}
                                {/*    <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>*/}
                                {/*    <li>Quisque sit amet est et sapien ullamcorper pharetra.</li>*/}
                                {/*</ul>*/}
                                {/*</ul>*/}
                                <br></br>
                                <h3>DANE TECHNICZNE</h3>
                                {/*<ul>*/}
                                {/*    <li>Capacity: {data.capacityFeat || "N/A"}</li>*/}
                                {/*    <li>Szerokość: 1134 mm</li>*/}
                                {/*    <li>Wysokość: 781 mm</li>*/}
                                {/*    <li>Waga: 87 kg</li>*/}
                                {/*    <li>Mocowanie: 3 punktowe</li>*/}
                                {/*    <li>Strona maszyny: 3 punktowe Kat 2</li>*/}
                                {/*    <li>Strona osprzętu: SMS/Euro</li>*/}
                                {/*    <li>Produkt: Adapter</li>*/}
                                {/*</ul>*/}
                                {renderFeatures(data)}
                                <br/>
                                <div className='price-container'>
                                    {/*<h2>899.99$</h2>*/}
                                    <h2>Ceny:</h2>
                                    {renderPrices(data)}
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
                                {/*<img src={sketch}/>*/}
                                <img src={`https://se-europe-test.pl${data.productInfo?.imagePath}`}/>
                            </div>
                        </section>
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
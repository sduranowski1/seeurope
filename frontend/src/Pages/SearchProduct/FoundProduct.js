import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Box, CircularProgress, Tooltip} from "@mui/material";
import DOMPurify from "dompurify";
import i18n from "i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const SearchProduct = () => {
    const { code } = useParams(); // Get the 'code' from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);



    console.log(code)

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setErrorMessage('');
            try {
                // Fetch the product by code using the dynamic parameter
                const response = await fetch(`https://seequipment.pl/api/enova_products?code=${code}`, {
                    headers: {
                        'Accept': 'application/json', // Specify the expected response format
                    },
                });
                const data = await response.json();

                console.log(data)

                if (data) {
                    setData(data[0]); // Set the product data from the API response
                    setProduct(data[0]); // Set the product data from the API response
                } else {
                    setErrorMessage('Product not found.');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setErrorMessage('An error occurred while fetching the product.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [code]); // Re-fetch the product when the code changes

    const renderFeatures = (product) => {
        // Define the desired feature names
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
            // 'My Machine',
            'OPIS WC',
            'Product',
            "Recommended Machine weight",
            "Type",
            "Variant",
            "Volume",
            // "WC_OutOfStock",
            // "WC_prodID",
            // "WC_Ukryty",
            "Weight",
            "Width"
        ];

        // Map through featuresList and fetch matching feature objects
        const features = featuresList.map((featureName) => {
            const matchedFeature = product.features.find((feature) => feature.nazwa === featureName);
            return {
                nazwa: featureName,
                wartosc: matchedFeature ? matchedFeature.wartosc : null,
            };
        });

        // Filter out features with null or empty string for wartosc
        const filteredFeatures = features.filter(
            (feature) => {
                const value = feature.wartosc;
                return !(value === 0 || value === false || value === "" || value == null || value === "False" || value === "0");
            }
        );


        // Render table rows dynamically
        return filteredFeatures.map((feature, index) => (
            <ul className="price-container" key={index}>
                <li>{feature.nazwa}: {feature.wartosc}</li>
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

    const germanDescription = data.productInfo?.germanDescription;
    const sanitizedGermanDescription = DOMPurify.sanitize(germanDescription);

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
                        <div className="product-container">
                            <div className="product-description">
                                <h1 className={"description-header"}>
                                    {i18n.language === "en"
                                        ? product.features?.find(feature => feature.nazwa === "Nazwa w EN")?.wartosc || product.name
                                        : i18n.language === "de"
                                            ? product.features?.find(feature => feature.nazwa === "Nazwa w DE")?.wartosc || product.name
                                            : product.name}
                                </h1>
                                <hr/>
                                <p>{data.code}</p>
                                <br/>
                                <div className={"description"}>
                                    {i18n.language === "en" ? (
                                        <div
                                            dangerouslySetInnerHTML={{__html: sanitizedDescription || "No description available"}}/>
                                    ) : i18n.language === "pl" ? (
                                        <div
                                            dangerouslySetInnerHTML={{__html: sanitizedPolishDescription || "Brak opisu"}}/>
                                    ) : (
                                        <div
                                            dangerouslySetInnerHTML={{__html: sanitizedGermanDescription || "keine Beschreibung"}}/>
                                    )}
                                </div>
                                <br/>
                                <h3 className={"description-header tech-data-header"}>DANE TECHNICZNE</h3>
                                <div>{renderFeatures(data)}</div>
                                <br/>
                                <div className={"hr-price"}></div>
                                <br/>
                                <div className={"in-stock"}>
                                    {data.stockStatus === "instock" ? (
                                        <Tooltip title="In Stock: This product is available.">
                                            <CheckCircleIcon
                                                style={{color: "green", cursor: "pointer", paddingTop: "9px"}}/>
                                        </Tooltip>
                                    ) : data.stockStatus === "onbackorder" ? (
                                        <Tooltip title="On Backorder: This product is not currently available.">
                                            <ErrorIcon
                                                style={{color: "orange", cursor: "pointer", paddingTop: "9px"}}/>
                                        </Tooltip>
                                    ) : (
                                        data.stockStatus || "made to order"
                                    )} {data.stockStatus}
                                </div>
                                <br/>
                            </div>
                            <div className="product-image">
                                <img src={`https://seequipment.pl${data.productInfo?.imagePath}`} alt="Product"/>
                            </div>
                        </div>

                    </section>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};


export default SearchProduct;

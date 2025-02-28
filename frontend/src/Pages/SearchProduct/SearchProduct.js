import React, { useState } from 'react';
import {TextField, IconButton, InputAdornment, CircularProgress, Tooltip} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Link, useNavigate} from "react-router-dom";
import i18n from "i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // Track if search was triggered
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleNavigation = (slug) => {
        navigate(`${slug}`);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async () => {
        if (searchTerm.trim() === '') {
            setProducts([]); // Clear products if search term is empty
            return;
        }

        setIsSearching(true); // Indicate that search is happening
        setErrorMessage(''); // Reset any previous error messages

        try {
            // Fetch filtered products based on the search term
            const response = await fetch(`https://se-europe-test.pl/api/enova_products/no_pagination?name=${searchTerm}`, {
                headers: {
                    'Accept': 'application/ld+json', // Specify the expected response format
                },
            });
            const data = await response.json();

            // Log the entire response to inspect its structure
            console.log('API Response:', data);

            // Check if the 'hydra:member' field exists and contains products
            if (data['hydra:member'] && Array.isArray(data['hydra:member'])) {
                setProducts(data['hydra:member']); // Set products from the response
            } else {
                setProducts([]); // Clear products if the expected field doesn't exist
                setErrorMessage('No products found.'); // Display message if no products found
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setErrorMessage('An error occurred while fetching the products.');
        } finally {
            setIsSearching(false); // Stop indicating search when done
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '400px', margin: '60px auto' }}>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleSearchSubmit} edge="end">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {isSearching ? (
                <CircularProgress sx={{marginTop: "25px"}}/> // Show a loading spinner while searching
            ) : (
                <div style={{width: "1120px"}}>
                    {errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        products.length > 0 && (
                            <div className={'links-container'}>
                                {products.map((product) => {
                                    return (
                                        <>
                                            <div className={'link'}
                                                 onClick={() => handleNavigation(`/search-product/${product.code}`)}
                                                 style={{
                                                     cursor: 'pointer',
                                                     display: 'flex',
                                                     flexDirection: 'column',
                                                     alignItems: 'center',
                                                     marginBottom: '20px'
                                                 }}>
                                                <div className={'bg-change'}/>
                                                <picture>
                                                    {product.productInfo?.imagePath && (
                                                        <img
                                                            src={product.productInfo?.imagePath}
                                                            alt={product.name}
                                                            style={{
                                                                maxWidth: '100%',
                                                                height: 'auto'
                                                            }} // Ensure images are responsive
                                                        />
                                                    )}
                                                </picture>
                                                <p className={'link-name'}>{product.name}</p>
                                                <div className={"link-name"} style={{marginTop: '65px'}}>
                                                    {product.stockStatus === "instock" ? (
                                                        <Tooltip title="In Stock: This product is available.">
                                                            <CheckCircleIcon
                                                                style={{color: "green", cursor: "pointer", paddingTop: "10px"}}/>
                                                            In stock
                                                        </Tooltip>
                                                    ) : product.stockStatus === "onbackorder" ? (
                                                        <Tooltip
                                                            title="On Backorder: This product is not currently available.">
                                                            <ErrorIcon style={{
                                                                color: "orange",
                                                                cursor: "pointer",
                                                                paddingTop: "10px"
                                                            }}/>
                                                            On Backorder
                                                        </Tooltip>
                                                    ) : (
                                                        product.stockStatus || "made to order"
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

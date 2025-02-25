import '../../../Components/TableWithTabs/TableWithTabs.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {TableComponent} from "../../../Components/TableComponent/TableComponent";
import {useContext, useEffect, useState} from "react";
import {ProductDescription} from "./ProductDescription";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from '@mui/icons-material/Error';
import {Button, IconButton, Tooltip} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AuthContext from "../../../AuthContext";
import {useNavigate} from "react-router-dom";
import i18n from "i18next";

export const SubcategoryTableBrands = ({ productsData, onProductClick, lastPartToCollapse, displayedItems, checkboxes, userDetailsPrice, title }) => {
    // const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(productsData);  // Manage the filtered products state
    const { token } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const uniqueCapacities = [
        "All",
        ...new Set(
            productsData.map((product) => {
                const couplingFilter = product?.productInfo?.couplingFilter;
                return i18n.language === "en"
                    ? couplingFilter?.name
                    : i18n.language === "de"
                        ? couplingFilter?.germanName
                        : couplingFilter?.polishName || "All";
            })
        )
    ];

// Sort and remove "All" from the initial selection
    const sortedCapacities = [...uniqueCapacities]
        .sort().sort((a, b) => {
            const numA = parseInt(a); // Extract the numeric part
            const numB = parseInt(b);
            return numA - numB; // Sort numerically
        })
        .filter((capacity) => capacity !== "All"); // Remove "All" from the sorted list

    // Use useState and set the first item as the default active filter
    const [activeFilter, setActiveFilter] = useState(sortedCapacities[0] || "All");

    useEffect(() => {
        setActiveFilter((prevFilter) =>
            sortedCapacities.includes(prevFilter) ? prevFilter : sortedCapacities[0] || "All"
        );
    }, [sortedCapacities]);


    // Set the active filter when a tab is clicked
    const handleFilterChange = (capacity) => {
        setActiveFilter(capacity);
    };

    console.log(sortedCapacities)

    // Filter products based on the active filter
    useEffect(() => {
        if (activeFilter === "All") {
            setFilteredProducts(productsData);
        } else {
            setFilteredProducts(
                productsData.filter((product) => {
                    const couplingFilter = product?.productInfo?.couplingFilter;
                    const translatedName =
                        i18n.language === "en"
                            ? couplingFilter?.name
                            : i18n.language === "de"
                                ? couplingFilter?.germanName
                                : couplingFilter?.polishName;

                    return translatedName === activeFilter;
                })
            );
        }
    }, [activeFilter, productsData]);

    const handleRowClick = (product) => {
        setSelectedProduct(product); // Highlight selected product
        onProductClick(product); // Trigger callback
    };

    // Reset selected product when lastPartToCollapse changes
    useEffect(() => {
        setSelectedProduct(null); // Reset selected product when lastPartToCollapse changes
    }, [lastPartToCollapse]);

    const handleQuantityChange = (productId, change) => {
        setFilteredProducts((prevProducts) =>
            prevProducts.map((product) => {
                if (product.id === productId) {
                    const updatedQuantity = Math.max(0, (product.quantity || 0) + change);

                    // Retrieve the cart from localStorage
                    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    const productIndex = cart.findIndex((item) => item.id === productId);

                    if (productIndex === -1 && updatedQuantity > 0) {
                        cart.push({ ...product, quantity: updatedQuantity });
                    } else if (productIndex !== -1) {
                        if (updatedQuantity > 0) {
                            cart[productIndex].quantity = updatedQuantity;
                        } else {
                            cart.splice(productIndex, 1); // Remove product if quantity is 0
                        }
                    }

                    localStorage.setItem('cart', JSON.stringify(cart));

                    // Update priceCurrency in localStorage safely
                    const priceCurrency = product.priceList?.length
                        ? product.priceList.find((price) => price.nazwa === userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa)?.waluta || "EUR"
                        : "EUR";

                    if (localStorage.getItem("priceCurrency") !== priceCurrency) {
                        localStorage.setItem("priceCurrency", priceCurrency);
                    }

                    // Dispatch the custom event to update badge
                    window.dispatchEvent(new Event('cartUpdated'));

                    return { ...product, quantity: updatedQuantity };
                }
                return product;
            })
        );
    };


    const handleAddToCart = () => {
        // Redirect to the cart page without modifying the cart
        navigate('/dashboard/cart');
    };

    console.log(userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa)

    const contractorName = userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa || "End User";

    // Check if the value exists before storing it
    if (contractorName) {
        localStorage.setItem('contractorName', contractorName);
    }

    useEffect(() => {
        // Set loading to true before fetching the data
        setLoading(true);

        fetch(`https://se-europe-test.pl/api/brands?name=${title}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setBrands(data[0]);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [title]); // This will trigger the effect whenever the title changes

    console.log("rbands or no", brands)

    const renderFeatures = (product) => {
        // Define a fallback list of feature names
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
            'OPIS WC',
            'Product',
            "Recommended Machine weight",
            "Type",
            "Variant",
            "Volume",
            "Weight",
            "Width"
        ];

        // Map through the featuresList and fetch matching feature objects
        const features = featuresList.map((featureName) => {
            const matchedFeature = product.features.find((feature) => feature.nazwa === featureName);

            // If found, return feature with its value, else return "N/A"
            return {
                nazwa: featureName,
                wartosc: matchedFeature ? matchedFeature.wartosc : "", // Default to "N/A" if not found
            };
        });

        // Filter out invalid or missing values (null, "", 0, false, etc.)
        const filteredFeatures = features.filter(feature => {
            const value = feature.wartosc;

            return value !== "krabąszcvx";
            // Keep feature if its value is valid, otherwise exclude it
            // return value !== 0 && value !== false && value !== "" && value != null && value !== "False" && value !== "0";
        });

        // // Return the filtered features (with valid values)
        // return filteredFeatures;

        // After filtering out invalid values, check against the brands object to decide visibility
        const displayedFeatures = filteredFeatures.filter((feature) => {
            const featureKey = feature.nazwa.toLowerCase().replace(' ', ''); // Convert to lowercase and remove spaces
            // Only display features if corresponding brand value is true
            return brands[featureKey] === true;
        });

        // Return the filtered and brand-validated features
        return displayedFeatures;
    };




    return (
        <div style={{paddingTop: "25px"}}>
            {/* Filter Tabs */}
            <div>
                {sortedCapacities.map((capacity, index) => (
                    <button
                        key={index}
                        onClick={() => handleFilterChange(capacity)}
                        style={{
                            fontSize: "1em",
                            fontWeight: "400",
                            padding: "0.5rem 1rem",
                            marginRight: "0.1rem",
                            cursor: "pointer",
                            backgroundColor: activeFilter === capacity ? "#1d6cc1" : "#aaa",
                            color: "white",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                        }}
                    >
                        {capacity}
                    </button>
                ))}
            </div>

            {/* Products Table */}
            <table style={{width: "100%"}}>
                <thead>
                <tr style={{textAlign: "left"}}>
                    <th>Kod</th>
                    <th>Product Name</th>
                    {/*<th>Capacity</th>*/}
                    {/* Replace static columns with dynamic ones */}
                    {/* Dynamically render feature headers, excluding columns with only N/A values */}
                    {filteredProducts.length > 0 &&
                        renderFeatures(filteredProducts[0])
                            .map((feature, index) => ({ ...feature, index })) // Add index to track position
                            .filter((feature) => {
                                // Check if any product has a non-N/A value for this feature
                                return filteredProducts.some(
                                    (product) => {
                                        const value = renderFeatures(product)[feature.index].wartosc;
                                        return value !== "" && value !== '0'; // Exclude "" and 0
                                    }
                                );
                            })
                            .map((feature) => (
                                <th key={feature.index}>{feature.nazwa}</th>
                            ))}
                    {/*<th>Brand</th>*/}
                    {/*<th>Variant</th>*/}
                    {token ? (
                        <>
                            {/* Check if at least one product has a dedicated price */}
                            {filteredProducts.some(product =>
                                product.priceList?.some(price =>
                                    price.nazwa === userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa
                                )
                            ) && <th>Dedicated Price</th>}
                            <th>End User Price</th>
                            <th>Add Quantity</th>
                        </>
                    ) : (
                        <a/>
                    )}
                    <th>Status</th>

                </tr>
                </thead>
                <tbody>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <tr
                            key={index}
                            onClick={() => handleRowClick(product)}
                            style={{
                                fontSize: "0.9em",
                                cursor: "pointer",
                                backgroundColor:
                                    selectedProduct === product ? "#72a2d5" : "transparent",
                                // color: selectedProduct === product ? "white" : "black",
                                transition: "background-color 0.3s, color 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                if (selectedProduct !== product) {
                                    e.currentTarget.style.backgroundColor = "#aaaaaa";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedProduct !== product) {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                }
                            }}
                        >
                            <td>{product.code || "" +
                                "" +
                                "" +
                                "" +
                                "" +
                                ""}</td>
                            <td>
                                {i18n.language === "en"
                                    ? product.features?.find(feature => feature.nazwa === "Nazwa w EN")?.wartosc || product.name
                                    : i18n.language === "de"
                                        ? product.features?.find(feature => feature.nazwa === "Nazwa w DE")?.wartosc || product.name
                                        : product.name}
                            </td>
                            {/*<td>{product.capacityFeat || ""}</td>*/}
                            {/* Dynamically render the features in their respective columns */}
                            {renderFeatures(product)
                                .map((feature, index) => ({ ...feature, index })) // Add index to track position
                                .filter((feature) => {
                                    // Check if any product has a non-N/A value for this feature
                                    return filteredProducts.some(
                                        (product) => {
                                            const value = renderFeatures(product)[feature.index].wartosc;
                                            return value !== "" && value !== '0'; // Exclude "" and 0
                                        }
                                    );
                                })
                                .map((feature) => (
                                    <td key={feature.index}>{feature.wartosc || ""}</td>
                                ))}
                            {/*<td>{product.productInfo?.brand?.name  || ""}</td>*/}
                            {/*<td>{product.productInfo?.variant?.variantname  || ""}</td>*/}


                            {token ? (
                                <>
                                    {product.priceList?.some(price => price.nazwa === userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa) && (
                                        <td>
                                            {product.priceList?.find(price => price.nazwa === userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa)?.netto || ""}
                                            {product.priceList?.find(price => price.nazwa === userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa)?.waluta || ""}
                                        </td>
                                    )}
                                    <td>{product.priceList?.find((price) => price.nazwa === "End User")?.netto || "N/A"} {product.priceList?.find((price) => price.nazwa === "End User")?.waluta || "N/A"}</td>
                                    <td>
                                        <button onClick={() => handleQuantityChange(product.id, -1)}></button>
                                        <input
                                            type="number"
                                            value={product.quantity || 0}
                                            onChange={(e) => handleQuantityChange(product.id, Number(e.target.value) - product.quantity)} // Allow manual input
                                            style={{width: "60px", textAlign: "center", margin: "0 5px"}}
                                        />
                                        <button onClick={() => handleQuantityChange(product.id, 1)}></button>
                                    </td>
                                </>
                            ) : (
                                <a/>
                            )}
                            <td>
                                {product.stockStatus === "instock" ? (
                                    <Tooltip title="In Stock: This product is available.">
                                        <CheckCircleIcon
                                            style={{color: "green", cursor: "pointer", paddingTop: "9px"}}/>
                                    </Tooltip>
                                ) : product.stockStatus === "onbackorder" ? (
                                    <Tooltip title="On Backorder: This product is not currently available.">
                                        <ErrorIcon style={{color: "orange", cursor: "pointer", paddingTop: "9px"}}/>
                                    </Tooltip>
                                ) : (
                                    product.stockStatus || "N/A"
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" style={{textAlign: "center", padding: "20px"}}>
                            No Items Found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {/* Global Redirect to Cart Button */}
            {token && (
                <div style={{textAlign: "right", marginTop: "20px"}}>
                    {token ? (
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{mt: 2}}
                            onClick={handleAddToCart}
                        >
                            Go to Cart
                        </Button>
                    ) : (
                        <a/>
                    )}
                </div>
            )}
            {/* Product Description */}
            {selectedProduct && (
                // <div style={{ marginTop: "1rem" }}>
                <div>
                    <ProductDescription product={selectedProduct} />
                </div>
            )}
        </div>
    );
};
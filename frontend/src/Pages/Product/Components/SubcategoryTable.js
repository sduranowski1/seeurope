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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from "@mui/icons-material/Error";
import {Button, IconButton, Tooltip} from "@mui/material";
import AuthContext from "../../../AuthContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from "react-router-dom";
import i18n from "i18next";
import useSortedProducts from "../useSortedProducts";
import {useTranslation} from "react-i18next";


// export const SubcategoryTable = (props) => {
//     const [value, setValue] = React.useState('1');
//
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//
//     return (
//         <Box sx={{ width: '100%', typography: 'body1' }}>
//             <TabContext value={value}>
//                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                     <TabList onChange={handleChange} aria-label="lab API tabs example">
//                         { Object.keys(props.productsData.tableData).map((name, i) => {
//                             return (
//                                 <Tab label={name} value={`${i+1}`} key={i} />
//                             )
//                         })}
//                     </TabList>
//                 </Box>
//
//                 { Object.values(props.productsData.tableData).map((table, i) => {
//                     return (
//                         <TabPanel key={i} value={`${i+1}`}>
//                             <TableComponent data={table} displayedItems={props.displayedItems} checkboxes={props.checkboxes}/>
//                         </TabPanel>
//                     )
//                 })}
//             </TabContext>
//         </Box>
//     );
// }

export const SubcategoryTable = ({ productsData, onProductClick, lastPartToCollapse, displayedItems, checkboxes, userDetailsPrice, title }) => {
    // const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(productsData);  // Manage the filtered products state
    const { token } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { sortedProducts, handleSort, sortColumn, sortOrder } = useSortedProducts(filteredProducts, userDetailsPrice);
    const [updatedCart, setUpdatedCart] = useState([]); // Store updates locally
    const { t } = useTranslation();




    // Get unique capacityFeat values for tabs
    const uniqueCapacities = [
        // "All",
        // ...new Set(productsData.map((product) => product.capacityFeat || "Other"))
        ...new Set(
            productsData.map((product) => {
                const machineFilter = product?.productInfo?.machineFilter;
                return i18n.language === "en"
                    ? machineFilter?.name
                    : i18n.language === "de"
                        ? machineFilter?.germanName
                        : machineFilter?.polishName || "All";
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
            // setFilteredProducts(productsData.filter((product) => product.capacityFeat === activeFilter));
            setFilteredProducts(
                productsData.filter((product) => {
                    const machineFilter = product?.productInfo?.machineFilter;
                    const translatedName =
                        i18n.language === "en"
                            ? machineFilter?.name
                            : i18n.language === "de"
                                ? machineFilter?.germanName
                                : machineFilter?.polishName;

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

                    setUpdatedCart((prevCart) => {
                        const existingCart = [...prevCart];
                        const productIndex = existingCart.findIndex((item) => item.id === productId);

                        if (productIndex === -1 && updatedQuantity > 0) {
                            existingCart.push({ ...product, quantity: updatedQuantity });
                        } else if (productIndex !== -1) {
                            if (updatedQuantity > 0) {
                                existingCart[productIndex].quantity = updatedQuantity;
                            } else {
                                existingCart.splice(productIndex, 1); // Remove if quantity is 0
                            }
                        }
                        return existingCart;
                    });

                    return { ...product, quantity: updatedQuantity };
                }
                return product;
            })
        );
    };


    const handleAddToCart = () => {
        // Retrieve existing cart from localStorage and merge it with updatedCart
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Merge the existing cart with updatedCart (avoiding duplicates)
        const mergedCart = [...existingCart];

        updatedCart.forEach((newItem) => {
            const index = mergedCart.findIndex((item) => item.id === newItem.id);
            if (index !== -1) {
                mergedCart[index].quantity = newItem.quantity;
            } else {
                mergedCart.push(newItem);
            }
        });

        // Save merged cart to localStorage
        localStorage.setItem('cart', JSON.stringify(mergedCart));

        // Update priceCurrency safely
        const priceCurrency = mergedCart.length
            ? mergedCart[0]?.priceList?.find((price) => price.nazwa === userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa)?.waluta || "EUR"
            : "EUR";

        if (localStorage.getItem("priceCurrency") !== priceCurrency) {
            localStorage.setItem("priceCurrency", priceCurrency);
        }

        // Dispatch the custom event to update badge
        window.dispatchEvent(new Event('cartUpdated'));

        // Navigate to the cart page
        navigate('/dashboard/cart');

        // Clear updatedCart so future changes only affect new items
        setUpdatedCart([]);
    };

    console.log(userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa)

    const contractorName = userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa || "End User";

    // Check if the value exists before storing it
    if (contractorName) {
        localStorage.setItem('contractorName', contractorName);
    }

    const urlPath = window.location.pathname;
    const parts = urlPath.split('/').filter(part => part !== '');
    const lastPart = parts[parts.length - 1];  // Last part of the URL path
    const secondPart = parts[parts.length - 2]; // Second to last part of the URL path
    const thirdPart = parts[parts.length - 3]; // Third to last part of the URL path
    let apiUrl;

    if (parts.length === 2) {
        apiUrl = `https://seequipment.pl/api/categories?name=${lastPart}`;
    } else if (parts.length === 3) {
        apiUrl = `https://seequipment.pl/api/subcategories?category.name=${secondPart}&subCatName=${lastPart}`;
    } else if (parts.length === 4) {
        apiUrl = `https://seequipment.pl/api/item_types?name=${lastPart}`;
    } else {
        throw new Error("Unsupported URL structure");
    }

    console.log(lastPart)

    useEffect(() => {
        // Set loading to true before fetching the data
        setLoading(true);

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data[0]);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [title]); // This will trigger the effect whenever the title changes

    console.log("rbands or no", categories)

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
            return categories[featureKey] === true;
        });

        // Return the filtered and brand-validated features
        return displayedFeatures;
    };

    // const renderFeatures = (product) => {
    //     // Define the desired feature names
    //     const featuresList = [
    //         'Capacity',
    //         'Depth',
    //         'Dimension',
    //         'Equipment side',
    //         'Exisiting fork',
    //         'Height',
    //         'Information',
    //         'Length',
    //         'Machine side',
    //         'Masa do',
    //         'Masa od',
    //         'Model',
    //         'More information',
    //         'OPIS WC',
    //         'Product',
    //         "Recommended Machine weight",
    //         "Type",
    //         "Variant",
    //         "Volume",
    //         "Weight",
    //         "Width"
    //     ];
    //
    //     // Map through featuresList and fetch matching feature objects
    //     const features = featuresList.map((featureName) => {
    //         const matchedFeature = product.features.find((feature) => feature.nazwa === featureName);
    //         return {
    //             nazwa: featureName,
    //             wartosc: matchedFeature ? matchedFeature.wartosc : "",
    //         };
    //     });
    //
    //     // Filter out features with null or empty string for wartosc
    //     const filteredFeatures = features.filter(
    //         (feature) => {
    //             const value = feature.wartosc;
    //             // return !(value === 0 || value === false || value === "" || value == null || value === "False" || value === "0");
    //             return value !== "krabąszcvx";
    //
    //         }
    //     );
    //
    //     return filteredFeatures;
    // };



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
                            color: activeFilter === capacity ? "white" : "white",
                            // border: "1px solid #ccc",
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
                    <th onClick={() => handleSort("code")} className={sortColumn === "code" ? "active" : ""}>
                        {t("productList.code")} {sortColumn === "code" ? (sortOrder === "asc" ? "▲" : "▼") : "▶"}
                    </th>
                    <th onClick={() => handleSort("productName")}>
                        {t("productList.productName")} {sortColumn === "productName" ? (sortOrder === "asc" ? "▲" : "▼") : "▶"}
                    </th>
                    {/*<th>Capacity</th>*/}
                    {/* Replace static columns with dynamic ones */}
                    {/*{filteredProducts.length > 0 && renderFeatures(filteredProducts[0]).map((feature, index) => (*/}
                    {/*    <th key={index}>{feature.nazwa}</th>*/}
                    {/*))}*/}
                    {filteredProducts.length > 0 &&
                        renderFeatures(filteredProducts[0])
                            .map((feature, index) => ({ ...feature, index }))  // Add index for later filtering
                            .filter(feature =>
                                filteredProducts.some(product => {
                                    const value = renderFeatures(product)[feature.index].wartosc;  // Get the value for this feature
                                    return value !== "" && value !== "0";  // Filter out invalid values
                                })
                            )
                            .map(feature => (
                                <th key={feature.index} onClick={() => handleSort(feature.nazwa)}>
                                    {t(`productList.features.${feature.nazwa}`, feature.nazwa)} {  // Apply translation here
                                    sortColumn === feature.nazwa ? (sortOrder === "asc" ? "▲" : "▼") : "▶"}
                                </th>
                            ))
                    }
                    {/*<th>Netto</th>*/}
                    {/*<th>Brand</th>*/}
                    {/*<th>Variant</th>*/}
                    {/*<th>Category</th>*/}
                    {/*<th>Subcategory</th>*/}
                    {token ? (
                        <>
                            <th onClick={() => handleSort("unit")}>
                                {t("productList.unit")} {sortColumn === "unit" ? (sortOrder === "asc" ? "▲" : "▼") : "▶"}
                            </th>
                            {/* Check if at least one product has a dedicated price */}
                            {filteredProducts.some(product =>
                                product.priceList?.some(price =>
                                    price.nazwa === userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa
                                )
                            ) && <th onClick={() => handleSort("dedicatedPrice")}>
                                {t("productList.dedicatedPrice")} {sortColumn === "dedicatedPrice" ? (sortOrder === "asc" ? "▲" : "▼") : "▶"}
                            </th>}
                            <th onClick={() => handleSort("endUserPrice")}>
                                {t("productList.endUserPrice")} {sortColumn === "endUserPrice" ? (sortOrder === "asc" ? "▲" : "▼") : "▶"}
                            </th>
                            <th>{t('productList.addQuantity')}</th>
                            {/*<th>Add to cart</th>*/}
                        </>
                    ) : (
                        <a/>
                    )}
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product, index) => (
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
                            <td>{product.code || ""}</td>
                            <td>  {i18n.language === "en"
                                ? product.features?.find(feature => feature.nazwa === "Nazwa w EN")?.wartosc || product.name
                                : i18n.language === "de"
                                    ? product.features?.find(feature => feature.nazwa === "Nazwa w DE")?.wartosc || product.name
                                    : product.name}</td>
                            {/*<td>{product.capacityFeat || ""}</td>*/}
                            {/* Dynamically render the features in their respective columns */}
                            {/*{renderFeatures(product).map((feature, index) => (*/}
                            {/*    <td key={index}>{feature.wartosc || "N/A"}</td>*/}
                            {/*))}*/}
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
                            {/*<td>{product.netto || ""}</td>*/}
                            {/*<td>{product.productInfo?.brand?.name === "Other" ? ("") : ("")}</td>*/}
                            {/*<td>{product.productInfo?.brand?.name || ""}</td>*/}
                            {/*<td>{product.brandName === "Other" ? ("") : ("")}</td>*/}
                            {/*<td>{product.variantName || ""}</td>*/}
                            {/*<td>{product.productInfo?.variant?.variantname || ""}</td>*/}
                            {/*<td>{product.categoryName || ""}</td>*/}
                            {/*<td>{product.subcategoryName || ""}</td>*/}

                            {token ? (
                                <>
                                    <td>{product.unit}</td>
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
                                    {/*<td>*/}
                                    {/*    <IconButton*/}
                                    {/*        color="primary"*/}
                                    {/*        size="large"*/}
                                    {/*        sx={{mt: 2, padding: 0, margin: 0}}*/}
                                    {/*        onClick={() => handleAddToCart()} // Pass the updated quantity*/}
                                    {/*    >*/}
                                    {/*        <ShoppingCartIcon/>*/}
                                    {/*    </IconButton>*/}
                                    {/*</td>*/}
                                </>
                            ) : (
                                <a/>
                            )}
                            <td>
                                {product.stockStatus === "instock" ? (
                                    <Tooltip title={t("productList.instockTooltip")}>
                                        <CheckCircleIcon style={{ color: "green", cursor: "pointer", paddingTop: "9px" }} />
                                    </Tooltip>
                                ) : product.stockStatus === "onbackorder" ? (
                                    <Tooltip title={t("productList.onbackorderTooltip")}>
                                        <ErrorIcon style={{ color: "orange", cursor: "pointer", paddingTop: "9px" }} />
                                    </Tooltip>
                                ) : (
                                    product.stockStatus || t("productList.notAvailable")
                                )}
                            </td>
                        </tr>

                    ))
                ) : (
                    <tr>
                        <td colSpan="8" style={{textAlign: "center", padding: "20px"}}>
                            {t("productList.noItemsFound")}
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
                            {t("productList.addToCart")}
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
                    <ProductDescription product={selectedProduct} addToCart={handleAddToCart}/>
                </div>
            )}
        </div>
    );
};
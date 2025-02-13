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

export const SubcategoryTableBrands = ({ productsData, onProductClick, lastPartToCollapse, displayedItems, checkboxes, userDetailsPrice }) => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(productsData);  // Manage the filtered products state
    const { token } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    // Get unique capacityFeat values for tabs
    const uniqueCapacities = [
        "All",
        // ...new Set(productsData.map((product) => product?.productInfo?.category?.name || "Other"))
        ...new Set(
            productsData.map((product) => {
                const couplingFilter = product?.productInfo?.couplingFilter;
                return i18n.language === "en"
                    ? couplingFilter?.name
                    : i18n.language === "de"
                        ? couplingFilter?.germanName
                        : couplingFilter?.polishName || "Other";
            })
        )

    ];

    // Filter products based on the active filter
    useEffect(() => {
        if (activeFilter === "All") {
            setFilteredProducts(productsData);
        } else {
            // setFilteredProducts(productsData.filter((product) => product?.productInfo?.category?.name === activeFilter));
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

    return (
        <div>
            {/* Filter Tabs */}
            <div>
                {uniqueCapacities.map((capacity, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveFilter(capacity)}
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
                    <th>Kod</th>
                    <th>Product Name</th>
                    <th>Capacity</th>
                    {/*<th>Netto</th>*/}
                    <th>Brand</th>
                    <th>Variant</th>
                    {/*<th>Category</th>*/}
                    {/*<th>Subcategory</th>*/}
                    <th>Status</th>
                    {token ? (
                        <>
                            <th>Dedicated Price</th>
                            <th>End User Price</th>
                            <th>Add Quantity</th>
                            {/*<th>Add to cart</th>*/}
                        </>
                    ) : (
                        <a/>
                    )}
                </tr>
                </thead>
                <tbody>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <tr
                            key={index}
                            onClick={() => handleRowClick(product)}
                            style={{
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
                                    ? product.productInfo?.englishTitle || product.name
                                    : i18n.language === "de"
                                        ? product.productInfo?.germanTitle || product.name
                                        : product.name}
                            </td>
                            <td>{product.capacityFeat || ""}</td>
                            {/*<td>{product.netto || "N/A"}</td>*/}
                            <td>{product.productInfo?.brand?.name  || ""}</td>
                            <td>{product.productInfo?.variant?.variantname  || ""}</td>
                            {/*<td>{product.variantName || ""}</td>*/}
                            {/*<td>{product.categoryName || "N/A"}</td>*/}
                            {/*<td>{product.subcategoryName || "N/A"}</td>*/}
                            <td>
                                {product.stockStatus === "instock" ? (
                                    <Tooltip title="In Stock: This product is available.">
                                        <CheckCircleIcon style={{color: "green", cursor: "pointer", paddingTop: "9px"}}/>
                                    </Tooltip>
                                ) : product.stockStatus === "onbackorder" ? (
                                    <Tooltip title="On Backorder: This product is not currently available.">
                                        <ErrorIcon style={{color: "orange", cursor: "pointer", paddingTop: "9px"}}/>
                                    </Tooltip>
                                ) : (
                                    product.stockStatus || "N/A"
                                )}
                            </td>

                        {token ? (
                            <>
                                <td>{product.priceList?.find((price) => price.nazwa === userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa)?.netto || ""} {product.priceList?.find((price) => price.nazwa === userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa)?.waluta || ""}</td>
                                <td>{product.priceList?.find((price) => price.nazwa === "End User")?.netto || "N/A"} {product.priceList?.find((price) => price.nazwa === "End User")?.waluta || "N/A"}</td>

                                <td>
                                    <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                                    <input
                                        type="number"
                                        value={product.quantity || 0}
                                        onChange={(e) => handleQuantityChange(product.id, Number(e.target.value) - product.quantity)} // Allow manual input
                                        style={{width: "60px", textAlign: "center", margin: "0 5px"}}
                                    />
                                    <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                                </td>
                                {/*<td>*/}
                                {/*    <IconButton*/}
                                {/*        color="primary"*/}
                                {/*        size="large"*/}
                                {/*        sx={{mt: 2, padding: 0, margin: 0}}*/}
                                {/*        onClick={() => handleAddToCart(product, product.quantity)} // Pass the updated quantity*/}
                                {/*    >*/}
                                {/*        <ShoppingCartIcon/>*/}
                                {/*    </IconButton>*/}
                                {/*</td>*/}
                            </>
                        ) : (
                            <a/>
                        )}
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
                <div style={{ textAlign: "right", marginTop: "20px" }}>
                    {token ? (
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 2 }}
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
import '../../../Components/TableWithTabs/TableWithTabs.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {TableComponent} from "../../../Components/TableComponent/TableComponent";
import {useEffect, useState} from "react";
import {ProductDescription} from "./ProductDescription";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from '@mui/icons-material/Error';
import {Tooltip} from "@mui/material";

export const SubcategoryTableBrands = ({ productsData, onProductClick, lastPartToCollapse, displayedItems, checkboxes }) => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Get unique capacityFeat values for tabs
    const uniqueCapacities = [
        "All",
        ...new Set(productsData.map((product) => product.categoryName || "Other"))
    ];

    // Filter products based on the active filter
    const filteredProducts =
        activeFilter === "All"
            ? productsData
            : productsData.filter((product) => product.categoryName === activeFilter);

    const handleRowClick = (product) => {
        setSelectedProduct(product); // Highlight selected product
        onProductClick(product); // Trigger callback
    };

    // Reset selected product when lastPartToCollapse changes
    useEffect(() => {
        setSelectedProduct(null); // Reset selected product when lastPartToCollapse changes
    }, [lastPartToCollapse]);

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
                            <td>{product.name || ""}</td>
                            <td>{product.capacityFeat || ""}</td>
                            {/*<td>{product.netto || "N/A"}</td>*/}
                            <td>{product.productInfo?.brand?.name  || ""}</td>
                            <td>{product.variantName || ""}</td>
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
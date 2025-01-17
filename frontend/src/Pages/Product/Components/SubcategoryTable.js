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

export const SubcategoryTable = ({ productsData, onProductClick, lastPartToCollapse, displayedItems, checkboxes }) => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(productsData);  // Manage the filtered products state
    const { token } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);




    // Get unique capacityFeat values for tabs
    const uniqueCapacities = [
        "All",
        ...new Set(productsData.map((product) => product.capacityFeat || "Other"))
    ];

    // Filter products based on the active filter
    useEffect(() => {
        if (activeFilter === "All") {
            setFilteredProducts(productsData);
        } else {
            setFilteredProducts(productsData.filter((product) => product.capacityFeat === activeFilter));
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
            prevProducts.map((product) =>
                product.id === productId
                    ? {
                        ...product,
                        quantity: Math.max(0, (product.quantity || 0) + change), // Ensure quantity doesn't go below 0
                    }
                    : product
            )
        );
    };




    const handleAddToCart = (product, quantity) => {
        // Get the current cart from localStorage, or an empty array if it's not there
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        const productIndex = existingCart.findIndex((item) => item.id === product.id);

        if (productIndex === -1) {
            // If product is not in the cart, add it with the given quantity
            existingCart.push({ ...product, quantity });
        } else {
            // If product is already in the cart, increase its quantity by the specified value
            existingCart[productIndex].quantity += quantity;
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(existingCart));

        console.log("Updated Cart:", existingCart); // Optional: to see the updated cart in the console

        navigate('/dashboard/cart');
    };






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
                            <th>Quantity</th>
                            <th>Add to cart</th>
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
                            <td>{product.code || ""}</td>
                            <td>{product.name || ""}</td>
                            <td>{product.capacityFeat || ""}</td>
                            {/*<td>{product.netto || ""}</td>*/}
                            <td>{product.brandName === "Other" ? ("") : ("")}</td>
                            <td>{product.variantName || ""}</td>
                            {/*<td>{product.categoryName || ""}</td>*/}
                            {/*<td>{product.subcategoryName || ""}</td>*/}
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
                                    product.stockStatus || "made to order"
                                )}
                            </td>
                            {token ? (
                                <>
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
                                    <td>
                                        <IconButton
                                            color="primary"
                                            size="large"
                                            sx={{mt: 2, padding: 0, margin: 0}}
                                            onClick={() => handleAddToCart(product, product.quantity)} // Pass the updated quantity
                                        >
                                            <ShoppingCartIcon/>
                                        </IconButton>
                                    </td>
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
            {/* Product Description */}
            {selectedProduct && (
                // <div style={{ marginTop: "1rem" }}>
                <div>
                    <ProductDescription product={selectedProduct}/>
                </div>
            )}
        </div>
    );
};
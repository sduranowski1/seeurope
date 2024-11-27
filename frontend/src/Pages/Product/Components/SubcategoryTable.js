import '../../../Components/TableWithTabs/TableWithTabs.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {TableComponent} from "../../../Components/TableComponent/TableComponent";
import {useState} from "react";

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

export const SubcategoryTable = ({ productsData, onProductClick, displayedItems, checkboxes }) => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Get unique capacityFeat values for tabs
    const uniqueCapacities = [
        "All",
        ...new Set(productsData.map((product) => product.capacityFeat || "N/A"))
    ];

    // Filter products based on the active filter
    const filteredProducts =
        activeFilter === "All"
            ? productsData
            : productsData.filter((product) => product.capacityFeat === activeFilter);

    const handleRowClick = (product) => {
        setSelectedProduct(product); // Highlight selected product
        onProductClick(product); // Trigger callback
    };

    return (
        <div>
            {/* Filter Tabs */}
            <div style={{ marginBottom: "1rem" }}>
                {uniqueCapacities.map((capacity, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveFilter(capacity)}
                        style={{
                            padding: "0.5rem 1rem",
                            marginRight: "0.5rem",
                            cursor: "pointer",
                            backgroundColor: activeFilter === capacity ? "#007BFF" : "#f1f1f1",
                            color: activeFilter === capacity ? "white" : "black",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        {capacity}
                    </button>
                ))}
            </div>

            {/* Products Table */}
            <table>
                <thead>
                <tr>
                    <th>Kod</th>
                    <th>Product Name</th>
                    <th>Capacity</th>
                    <th>Netto</th>
                    <th>Brand</th>
                    <th>Variant</th>
                    <th>Category</th>
                    <th>Subcategory</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map((product, index) => (
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
                        <td>{product.kod || "N/A"}</td>
                        <td>{product.nazwa || "N/A"}</td>
                        <td>{product.capacityFeat || "N/A"}</td>
                        <td>{product.netto || "N/A"}</td>
                        <td>{product.brandName || "N/A"}</td>
                        <td>{product.variantName || "N/A"}</td>
                        <td>{product.categoryName || "N/A"}</td>
                        <td>{product.subcategoryName || "N/A"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
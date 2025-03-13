import * as React from 'react';
import {List, Datagrid, TextField, DateField, NumberField, TextInput, SearchInput, Button} from 'react-admin';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";
import { useNotify, useRefresh } from 'react-admin';

const postFilters = [
    <SearchInput source="name" placeholder="Search by name" alwaysOn/>,
    <SearchInput source="code" placeholder="Search by code" alwaysOn/>
    // <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];

const EnovaProductList = () => {
    const notify = useNotify();
    const refresh = useRefresh();
    const [loading, setLoading] = React.useState(false);  // Track the loading state

    const handleFetchEnovaProducts = async () => {
        setLoading(true);  // Set loading to true when the request starts
        try {
            // Replace with your actual fetch logic
            const response = await fetch('https://seequipment.pl/api/fetch-enova-products', { method: 'POST' });

            if (response.ok) {
                notify('Enova products fetched successfully', 'info');
                refresh();  // Refresh the list to show updated data
            } else {
                throw new Error('Failed to fetch Enova products');
            }
        } catch (error) {
            notify('Error: ' + error.message, 'warning');
        } finally {
            setLoading(false);  // Set loading to false when the request finishes (success or failure)
        }
    };

    return (
        <List resource="enova_products" filters={postFilters} pagination={<AdminPagination />}>
            {/* Button with loading animation */}
            <Button label={loading ? "Fetching..." : "Fetch Enova Products"} onClick={handleFetchEnovaProducts} disabled={loading}>
                {loading && (
                    <span>
                        {/*<span className="dot">.</span>*/}
                        {/*<span className="dot">.</span>*/}
                        {/*<span className="dot">.</span>*/}
                    </span>
                )}
            </Button>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="code" />
                <TextField source="productInfo.brand.name" label="Brand" />
                <TextField source="productInfo.variant.variantname" label="Variant" />
                <TextField source="productInfo.category.name" label="Category" />
                <TextField source="productInfo.subcategory.subCatName" label="Subcategory" />
                <TextField source="productInfo.itemType.name" label="Item type" />
                <TextField source="productInfo.couplingFilter.name" label="Coupling filter" />
                <TextField source="productInfo.machineFilter.name" label="Machine filter" />
                <TextField source="stockStatus" />
                <NumberField source="quantity" />
                <DateField source="updatedAt" />
            </Datagrid>
        </List>
    );
};

export default EnovaProductList;
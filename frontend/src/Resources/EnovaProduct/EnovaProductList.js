import * as React from 'react';
import {List, Datagrid, TextField, DateField, NumberField, TextInput, SearchInput} from 'react-admin';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const postFilters = [
    <SearchInput source="name" placeholder="Search by name" alwaysOn/>,
    <SearchInput source="code" placeholder="Search by code" alwaysOn/>
    // <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];

const EnovaProductList = () => (
    <List resource="enova_products" filters={postFilters} pagination={<AdminPagination />}>
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

export default EnovaProductList;
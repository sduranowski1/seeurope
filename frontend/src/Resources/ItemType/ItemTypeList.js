import * as React from 'react';
import {List, Datagrid, TextField, ReferenceField, TextInput, DateField, SearchInput} from 'react-admin';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const postFilters = [
    <SearchInput source="name" placeholder="Search by name" alwaysOn/>,
    <SearchInput source="subcategory.subCatName" placeholder="Search by subcategory name" alwaysOn/>
];

const ItemTypeList = () => (
    <List resource="item_types"  filters={postFilters}  pagination={<AdminPagination />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="polishName" />
            <TextField source="germanName" />
            <ReferenceField reference="subcategories/no_pagination" source="subcategory.id" label="SubCategory" >
                <TextField source="subCatName" />
            </ReferenceField>
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
    </List>
);

export default ItemTypeList;

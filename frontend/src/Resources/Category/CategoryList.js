import * as React from 'react';
import {List, Datagrid, TextField, DateField, SearchInput} from 'react-admin';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const postFilters = [
    <SearchInput source="name" placeholder="Search by name" alwaysOn/>,
];

const CategoryList = () => (
    <List resource="categories" filters={postFilters} pagination={<AdminPagination />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="polishName" />
            <TextField source="germanName" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
    </List>
);

export default CategoryList;

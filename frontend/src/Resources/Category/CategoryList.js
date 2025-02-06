import * as React from 'react';
import {List, Datagrid, TextField, DateField} from 'react-admin';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const CategoryList = () => (
    <List resource="categories"  pagination={<AdminPagination />}>
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

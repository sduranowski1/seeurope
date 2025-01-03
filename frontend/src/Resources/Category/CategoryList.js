import * as React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

const CategoryList = () => (
    <List resource="categories">
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="polishName" />
            <TextField source="germanName" />
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
        </Datagrid>
    </List>
);

export default CategoryList;

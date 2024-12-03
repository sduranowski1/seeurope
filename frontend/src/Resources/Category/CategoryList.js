import * as React from 'react';
import {List, Datagrid, TextField, ImageInput, ImageField} from 'react-admin';

const CategoryList = () => (
    <List resource="categories">
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
            <ImageInput source="pictures" label="Related pictures">
                <ImageField source="domainImagePath"/>
            </ImageInput>
            <ImageField source="domainImagePath"/>
        </Datagrid>
    </List>
);

export default CategoryList;

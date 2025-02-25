// src/BookList.js

import * as React from 'react';
import {List, Datagrid, TextField, ReferenceField, DateField} from 'react-admin';
import customDataProvider from '../../dataProvider';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

// const BookList = (props) => (
//   <List {...props} perPage={10} dataProvider={customDataProvider}>
//     <Datagrid>
//       <TextField source="id" />
//       <TextField source="title" />
//       <TextField source="author" />
//       <TextField source="publishedDate" />
//     </Datagrid>
//   </List>
// );

const FeaturesList = () => (
    <List resource="features_lists"  pagination={<AdminPagination />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField reference="brands" source="brand.id" label="Brand" >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField reference="variants" source="variant.id" label="Variant" >
                <TextField source="variantname" />
            </ReferenceField>
            <ReferenceField reference="categories" source="category.id" label="Category" >
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField reference="subcategories" source="subcategory.id" label="Subcategory" >
                <TextField source="subCatName" />
            </ReferenceField>
            <ReferenceField reference="itemTypes" source="itemType.id" label="Item Type" >
                <TextField source="name" />
            </ReferenceField>
            <DateField source="updatedAt" />
        </Datagrid>
    </List>
);

export default FeaturesList;

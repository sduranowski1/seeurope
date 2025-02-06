// src/BookList.js

import * as React from 'react';
import {List, Datagrid, TextField, ReferenceField} from 'react-admin';
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

const ProductList = () => (
  <List resource="products"  pagination={<AdminPagination />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="itemNo" />
      <TextField source="name" />
      <TextField source="price" />
      <TextField source="quantity" />
      <TextField source="unit" />
      <TextField source="model" />
      {/*<TextField source="brands" />*/}
      <ReferenceField reference="brands" source="bid" label="Brand" >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="variants" source="vid" label="Variant" >
        <TextField source="variantname" />
      </ReferenceField>
      {/*<TextField source="brandModel" />*/}
      <TextField source="category" />
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
    </Datagrid>
  </List>
);

export default ProductList;

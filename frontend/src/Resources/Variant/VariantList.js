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

const VariantList = () => (
  <List resource="variants"  pagination={<AdminPagination />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="variantname" />
        <TextField source="polishName" />
        <TextField source="germanName" />
      <ReferenceField reference="brands" source="bid" label="Brand" >
        <TextField source="name" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export default VariantList;

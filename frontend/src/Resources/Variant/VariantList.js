// src/BookList.js

import * as React from 'react';
import {List, Datagrid, TextField, ReferenceField, DateField, SearchInput} from 'react-admin';
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

const postFilters = [
  <SearchInput source="variantname" placeholder="Search by name" alwaysOn/>,
  <SearchInput source="brand.name" placeholder="Search by brand name" alwaysOn/>
];

const VariantList = () => (
  <List resource="variants" filters={postFilters} pagination={<AdminPagination />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="variantname" />
        <TextField source="polishName" />
        <TextField source="germanName" />
      <ReferenceField reference="brands" source="brand.id" label="Brand" >
        <TextField source="name" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export default VariantList;

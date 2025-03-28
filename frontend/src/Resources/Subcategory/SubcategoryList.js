// src/BookList.js

import * as React from 'react';
import {List, Datagrid, TextField, ReferenceField, TextInput, DateField, SearchInput} from 'react-admin';
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
  <SearchInput source="subCatName" placeholder="Search by name" alwaysOn/>,
  <SearchInput source="category.name" placeholder="Search by category name" alwaysOn/>
];

const SubcategoryList = () => (
  <List resource="subcategories" filters={postFilters}  pagination={<AdminPagination />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="subCatName" />
        <TextField source="polishSubCatName" />
        <TextField source="germanSubCatName" />
      <ReferenceField reference="categories" source="category.id" label="Category" >
        <TextField source="name" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export default SubcategoryList;

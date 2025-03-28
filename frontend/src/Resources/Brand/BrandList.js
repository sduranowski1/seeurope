// src/BookList.js

import * as React from 'react';
import {List, Datagrid, TextField, DateField, SearchInput} from 'react-admin';
import customDataProvider from '../../dataProvider';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";
import SortingSelect from "../../Components/AdminSortingSelect/SortingSelect";

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
    <SearchInput source="name" placeholder="Search by name" alwaysOn />,
];

const BrandList = () => (
  <List resource="brands" filters={postFilters}  pagination={<AdminPagination />}>
      {/*<SortingSelect/>*/}
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
        <TextField source="polishName" />
        <TextField source="germanName" />
      {/*<TextField source="variant" />*/}
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export default BrandList;

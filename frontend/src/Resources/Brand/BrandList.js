// src/BookList.js

import * as React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import customDataProvider from '../../dataProvider';

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

const BrandList = () => (
  <List resource="brands">
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      {/*<TextField source="variant" />*/}
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
    </Datagrid>
  </List>
);

export default BrandList;

// src/BookList.js

import * as React from 'react';
import {List, Datagrid, TextField, ReferenceField} from 'react-admin';
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

const VariantList = () => (
  <List resource="variants">
    <Datagrid>
      <TextField source="id" />
      <TextField source="variantname" />
      <ReferenceField reference="brands" source="bid" label="Brand" >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
    </Datagrid>
  </List>
);

export default VariantList;

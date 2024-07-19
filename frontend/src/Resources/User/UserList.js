// src/BookList.js

import * as React from 'react';
import { List, Datagrid, TextField, BooleanField  } from 'react-admin';

const UserList = (props) => (
  <List {...props} perPage={10}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="firstname" />
      <TextField source="surname" />
      {/*<TextField source="author" />*/}
      {/*<TextField source="publishedDate" />*/}
      <BooleanField source="enabled" />

    </Datagrid>
  </List>
);

export default UserList;

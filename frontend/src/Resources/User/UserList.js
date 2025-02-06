// src/BookList.js

import * as React from 'react';
import { List, Datagrid, TextField, BooleanField  } from 'react-admin';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const UserList = (props) => (
  <List {...props} pagination={<AdminPagination />}>
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

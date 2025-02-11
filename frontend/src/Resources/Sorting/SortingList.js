// src/BookList.js

import * as React from 'react';
import {List, Datagrid, TextField, DateField} from 'react-admin';
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

const SortingList = () => (
    <List resource="global_settings"  pagination={<AdminPagination />}>
        {/*<SortingSelect/>*/}
        <Datagrid>
            {/*<TextField source="id" />*/}
            <TextField source="sortField" />
            <TextField source="sortOrder" />
            {/*<DateField source="createdAt" />*/}
            {/*<DateField source="updatedAt" />*/}
        </Datagrid>
    </List>
);

export default SortingList;

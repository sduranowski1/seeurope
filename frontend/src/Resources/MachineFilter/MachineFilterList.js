// src/BookList.js

import * as React from 'react';
import {List, Datagrid, TextField, DateField, SearchInput} from 'react-admin';
import customDataProvider from '../../dataProvider';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const postFilters = [
    <SearchInput source="name" placeholder="Search by name" alwaysOn/>,
];

const MachineFilterList = () => (
    <List resource="machine_filters" filters={postFilters}  pagination={<AdminPagination />}>
        {/*<SortingSelect/>*/}
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="polishName" />
            <TextField source="germanName" />
            {/*<TextField source="variant" />*/}
            {/*<DateField source="createdAt" />*/}
            {/*<DateField source="updatedAt" />*/}
        </Datagrid>
    </List>
);

export default MachineFilterList;

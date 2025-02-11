// src/BookList.js

import * as React from 'react';
import {List, Datagrid, TextField, DateField} from 'react-admin';
import customDataProvider from '../../dataProvider';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const MachineFilterList = () => (
    <List resource="machine_filters"  pagination={<AdminPagination />}>
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

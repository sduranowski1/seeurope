import * as React from 'react';
import {List, Datagrid, TextField, DateField} from 'react-admin';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const EnovaOrderList = () => (
    <List resource="enova_orders"  pagination={<AdminPagination />} sort={{ field: 'createdAt', order: 'DESC' }} // Add sorting here
    >
        <Datagrid>
            <TextField source="id" />
            <TextField source="numerEnova" />
            <TextField source="wartosc" />
            <TextField source="email" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
    </List>
);

export default EnovaOrderList;

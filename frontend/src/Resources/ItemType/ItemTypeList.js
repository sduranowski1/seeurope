import * as React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

const ItemTypeList = () => (
    <List resource="item_types">
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
        </Datagrid>
    </List>
);

export default ItemTypeList;

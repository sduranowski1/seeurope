import * as React from 'react';
import {List, Datagrid, TextField, ReferenceField} from 'react-admin';

const ItemTypeList = () => (
    <List resource="item_types">
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField reference="subcategories" source="scid" label="SubCategory" >
                <TextField source="subCatName" />
            </ReferenceField>
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
        </Datagrid>
    </List>
);

export default ItemTypeList;

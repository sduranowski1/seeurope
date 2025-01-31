import * as React from 'react';
import {List, Datagrid, TextField, ReferenceField, TextInput, DateField} from 'react-admin';

const ItemTypeList = () => (
    <List resource="item_types">
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="polishName" />
            <TextField source="germanName" />
            <ReferenceField reference="subcategories" source="scid" label="SubCategory" >
                <TextField source="subCatName" />
            </ReferenceField>
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
    </List>
);

export default ItemTypeList;

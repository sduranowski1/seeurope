import * as React from 'react';
import {List, Datagrid, TextField, ReferenceField, TextInput, DateField} from 'react-admin';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const ItemTypeList = () => (
    <List resource="item_types"  pagination={<AdminPagination />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="polishName" />
            <TextField source="germanName" />
            <ReferenceField reference="subcategories" source="subcategory.id" label="SubCategory" >
                <TextField source="subCatName" />
            </ReferenceField>
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </Datagrid>
    </List>
);

export default ItemTypeList;

// src/Resources/UserEdit.js
import React from 'react';
import {Edit, SimpleForm, TextInput, BooleanInput, NumberInput, TextField} from 'react-admin';

import "../../mui_fix.css"

const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            {/*<TextInput source="id" disabled />*/}
            <TextInput source="email" />
            <TextInput source="firstname" />
            <TextInput source="surname" />
            <TextInput source="company" />
            <TextInput source="address" />
            <TextInput source="zipCode" />
            <TextInput source="country" />
            <NumberInput source="phone" />
            <TextInput source="machineType" />
            <TextInput source="consdieredProducts" />
            <TextField source="message" />

            <BooleanInput source="enabled" />
        </SimpleForm>
    </Edit>
);

export default UserEdit;

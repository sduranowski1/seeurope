// src/BrandCreate.js

import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    DateInput,
    ImageField,
    ImageInput, NumberInput, TextField, BooleanInput
} from 'react-admin';

const VariantCreate = (props) => (
    <Create {...props}>
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
            <TextInput source="consideredProducts" />
            <TextInput source="plainPassword" />
            <TextField source="message" />


            <BooleanInput source="enabled" />
        </SimpleForm>
    </Create>
);

export default VariantCreate;
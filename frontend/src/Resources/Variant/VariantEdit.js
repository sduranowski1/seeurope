// src/Resources/UserEdit.js
import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    NumberInput,
    TextField,
    SelectInput,
    ReferenceInput
} from 'react-admin';

import "../../mui_fix.css"

const VariantEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="variantname" />
            <ReferenceInput reference="brands" source="bid">
                <SelectInput
                    label="Brand"
                    source="bid"
                    optionText="name"
                />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export default VariantEdit;

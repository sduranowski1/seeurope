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
    ReferenceInput, ImageInput, ImageField
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
            <ImageInput source="pictures" label="Related pictures">
                <ImageField source="domainImagePath"/>
            </ImageInput>
            <ImageField source="domainImagePath"/>
        </SimpleForm>
    </Edit>
);

export default VariantEdit;

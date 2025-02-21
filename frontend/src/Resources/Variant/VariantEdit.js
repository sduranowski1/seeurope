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
    ReferenceInput, ImageInput, ImageField, required
} from 'react-admin';

import "../../mui_fix.css"

const VariantEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="variantname" />
            <TextInput source="polishName" />
            <TextInput source="germanName" />
            <TextInput source="description" />
            <TextInput source="polishDescription" />
            <TextInput source="germanDescription" />
            <ReferenceInput reference="brands" source="brand.id">
                <SelectInput
                    label="Brand"
                    source="brand.id"
                    optionText={(record) => record?.name}
                    validate={required()}
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

// src/Resources/UserEdit.js
import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    NumberInput,
    TextField,
    ImageInput,
    ImageField,
    ReferenceInput, SelectInput, required
} from 'react-admin';

import "../../mui_fix.css"

const ItemTypeEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
          <TextInput source="name" />
            <TextInput source="polishName" />
            <TextInput source="germanName" />
            <ReferenceInput reference="subcategories" source="subcategory.id">
                <SelectInput
                    label="Subcategory"
                    source="subcategory.id"
                    optionText={(record) => record?.subCatName}
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

export default ItemTypeEdit;

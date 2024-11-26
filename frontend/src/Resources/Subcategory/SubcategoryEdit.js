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

const SubcategoryEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="subCatName" />
            <ReferenceInput reference="categories" source="cid">
                <SelectInput
                    label="Category"
                    source="cid"
                    optionText="name"
                />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export default SubcategoryEdit;
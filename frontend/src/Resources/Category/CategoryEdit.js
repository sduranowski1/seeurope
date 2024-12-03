// src/Resources/UserEdit.js
import React from 'react';
import {Edit, SimpleForm, TextInput, BooleanInput, NumberInput, TextField, ImageInput, ImageField} from 'react-admin';

import "../../mui_fix.css"

const CategoryEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
          <TextInput source="name" />
            <ImageInput source="pictures" label="Related pictures">
                <ImageField source="domainImagePath"/>
            </ImageInput>
            <ImageField source="domainImagePath"/>
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;

// src/Resources/UserEdit.js
import React from 'react';
import {Edit, SimpleForm, TextInput, BooleanInput, NumberInput, TextField} from 'react-admin';

import "../../mui_fix.css"

const CategoryEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
          <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;

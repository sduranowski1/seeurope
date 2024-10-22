// src/Resources/UserEdit.js
import React from 'react';
import {Edit, SimpleForm, TextInput, BooleanInput, NumberInput, TextField} from 'react-admin';

import "../../mui_fix.css"

const BrandEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
          <TextInput source="name" />
          {/*<TextInput source="variant" />*/}
        </SimpleForm>
    </Edit>
);

export default BrandEdit;

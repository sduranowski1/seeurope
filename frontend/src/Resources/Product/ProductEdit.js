// src/Resources/UserEdit.js
import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput
} from 'react-admin';

import "../../mui_fix.css"

const ProductEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
          <TextInput source="itemNo" />
          <TextInput source="name" />
          <TextInput source="price" />
          <TextInput source="quantity" />
          <TextInput source="unit" />
          <TextInput source="model" />
          {/*<TextInput source="brand" />*/}
          <ReferenceInput reference="brands" source="bid">
            <SelectInput
                label="Brand"
                source="bid"
                optionText="name"
            />
          </ReferenceInput>
            <ReferenceInput reference="variants" source="vid">
            <SelectInput
                label="Variant"
                source="vid"
                optionText="variantname"
            />
          </ReferenceInput>
          {/*<TextInput source="brandModel" />*/}
          <TextInput source="category" />
        </SimpleForm>
    </Edit>
);

export default ProductEdit;

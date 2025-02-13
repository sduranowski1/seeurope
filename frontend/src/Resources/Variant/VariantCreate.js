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
    ImageInput, required
} from 'react-admin';

const VariantCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="variantname" />
        <TextInput source="polishName" />
        <TextInput source="germanName" />
      <ReferenceInput source="bid" reference="brands">
        <SelectInput optionText="name" validate={required()}/>
      </ReferenceInput>
      {/*<DateInput source="createdAt" />*/}
      {/*<DateInput source="updatedAt" />*/}
        <ImageInput source="pictures" label="Related pictures">
            <ImageField source="src" title="title" />
        </ImageInput>
    </SimpleForm>
  </Create>
);

export default VariantCreate;

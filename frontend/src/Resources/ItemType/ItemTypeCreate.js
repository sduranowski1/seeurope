// src/BrandCreate.js

import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    DateInput,
    ImageInput,
    ImageField
} from 'react-admin';

const ItemTypeCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
        <TextInput source="polishName" />
        <TextInput source="germanName" />
      <ReferenceInput source="scid" reference="subcategories">
        <SelectInput optionText="subCatName" />
      </ReferenceInput>
      {/*<DateInput source="createdAt" />*/}
      {/*<DateInput source="updatedAt" />*/}
        <ImageInput source="pictures" label="Related pictures">
            <ImageField source="src" title="title" />
        </ImageInput>
    </SimpleForm>
  </Create>
);

export default ItemTypeCreate;

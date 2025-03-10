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
    ImageField, required
} from 'react-admin';

const ItemTypeCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
        <TextInput source="polishName" />
        <TextInput source="germanName" />
      <ReferenceInput source="scid" reference="subcategories/no_pagination">
          <SelectInput
              optionText={(record) => `${record?.category.name} - ${record?.subCatName}`}
              validate={required()}
          />
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

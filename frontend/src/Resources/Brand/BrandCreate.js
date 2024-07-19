// src/BrandCreate.js

import * as React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, DateInput } from 'react-admin';

const BrandCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      {/*<ReferenceInput source="bid" reference="brands">*/}
      {/*  <SelectInput optionText="name" />*/}
      {/*</ReferenceInput>*/}
      {/*<DateInput source="createdAt" />*/}
      {/*<DateInput source="updatedAt" />*/}
    </SimpleForm>
  </Create>
);

export default BrandCreate;

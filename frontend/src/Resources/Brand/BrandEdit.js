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
    Datagrid, ReferenceArrayField
} from 'react-admin';

import "../../mui_fix.css"

const BrandEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
          <TextInput source="name" />
            <TextInput source="polishName" />
            <TextInput source="germanName" />
          {/*<TextInput source="variant" />*/}
            <TextInput source="description" />
            <TextInput source="polishDescription" />
            <TextInput source="germanDescription" />
          <ImageInput source="pictures" label="Related pictures">
              <ImageField source="domainImagePath"/>
          </ImageInput>
          <ImageField source="domainImagePath"/>
            <ReferenceArrayField reference="featuresLists" source="brand_ids">
                <Datagrid>
                    <TextField source="name" />
                </Datagrid>
            </ReferenceArrayField>

        </SimpleForm>
    </Edit>
);

export default BrandEdit;

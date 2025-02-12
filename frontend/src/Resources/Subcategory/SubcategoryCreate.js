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
    ImageInput
} from 'react-admin';
import { required } from 'react-admin';

const SubcategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="subCatName" />
            <TextInput source="polishSubCatName" />
            <TextInput source="germanSubCatName" />
            <ReferenceInput source="cid" reference="categories">
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

export default SubcategoryCreate;
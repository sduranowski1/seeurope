
import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    NumberInput,
    TextField,
    SelectInput,
    ReferenceInput, ImageInput, ImageField, required
} from 'react-admin';

import "../../mui_fix.css"

const SubcategoryEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="subCatName" />
            <TextInput source="polishSubCatName" />
            <TextInput source="germanSubCatName" />
            <TextInput source="description" />
            <TextInput source="polishDescription" />
            <TextInput source="germanDescription" />
            <ReferenceInput reference="categories/no_pagination" source="category.id">
                <SelectInput
                    label="Category"
                    source="category.id"
                    optionText={(record) => record?.name}
                    validate={required()}
                />
            </ReferenceInput>
            <ImageInput source="pictures" label="Related pictures">
                <ImageField source="domainImagePath"/>
            </ImageInput>
            <ImageField source="domainImagePath"/>
        </SimpleForm>
    </Edit>
);

export default SubcategoryEdit;
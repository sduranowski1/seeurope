// src/Resources/UserEdit.js
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

const FeaturesEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput reference="brands" source="brand.id">
                <SelectInput
                    label="Brand"
                    source="brand.id"
                    optionText={(record) => record?.name}
                    validate={required()}
                />
            </ReferenceInput>
            <ReferenceInput reference="variants" source="variant.id">
                <SelectInput
                    label="Variant"
                    source="variant.id"
                    optionText={(record) => record?.variantname}
                    validate={required()}
                />
            </ReferenceInput>
            <ReferenceInput reference="categories" source="category.id">
                <SelectInput
                    label="Category"
                    source="category.id"
                    optionText={(record) => record?.name}
                    validate={required()}
                />
            </ReferenceInput>
            <ReferenceInput reference="subcategories" source="subcategory.id">
                <SelectInput
                    label="Subcategory"
                    source="subcategory.id"
                    optionText={(record) => record?.subCatName}
                    validate={required()}
                />
            </ReferenceInput>
            <ReferenceInput reference="itemTypes" source="itemType.id">
                <SelectInput
                    label="Item Type"
                    source="itemType.id"
                    optionText={(record) => record?.name}
                    validate={required()}
                />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export default FeaturesEdit;

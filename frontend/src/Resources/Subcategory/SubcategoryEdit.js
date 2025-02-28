
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
            {/* Add Boolean Inputs for each of the boolean fields */}
            <BooleanInput source="capacity" label="Capacity" />
            <BooleanInput source="depth" label="Depth" />
            <BooleanInput source="dimension" label="Dimension" />
            <BooleanInput source="equipmentSide" label="Equipment side" />
            <BooleanInput source="existingFork" label="Existing fork" />
            <BooleanInput source="height" label="Height" />
            <BooleanInput source="information" label="Information" />
            <BooleanInput source="length" label="Length" />
            <BooleanInput source="machineSide" label="Machine side" />
            <BooleanInput source="masaDo" label="Masa do" />
            <BooleanInput source="masaOd" label="Masa od" />
            <BooleanInput source="model" label="Model" />
            <BooleanInput source="moreInformation" label="More information" />
            <BooleanInput source="opisWC" label="OPIS WC" />
            <BooleanInput source="product" label="Product" />
            <BooleanInput source="recommendedMachineWeight" label="Recommended Machine weight" />
            <BooleanInput source="type" label="Type" />
            <BooleanInput source="variant" label="Variant" />
            <BooleanInput source="volume" label="Volume" />
            <BooleanInput source="weight" label="Weight" />
            <BooleanInput source="width" label="Width" />
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
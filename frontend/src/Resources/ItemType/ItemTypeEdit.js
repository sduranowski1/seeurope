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
    ReferenceInput, SelectInput, required
} from 'react-admin';

import "../../mui_fix.css"

const ItemTypeEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
          <TextInput source="name" />
            <TextInput source="polishName" />
            <TextInput source="germanName" />
            <TextInput source="description" />
            <TextInput source="polishDescription" />
            <TextInput source="germanDescription" />
            <ReferenceInput reference="subcategories/no_pagination" source="subcategory.id" sort={{ field: "subCatName", order: "ASC" }}
            >
                <SelectInput
                    label="Subcategory"
                    source="subcategory.id"
                    optionText={(record) => (
                        <span>
                            <span style={{ color: "#aaa" }}>{record?.category?.name} -</span> {record?.subCatName}
                        </span>
                    )}                    validate={required()}
                />
            </ReferenceInput>
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

            <ImageInput source="pictures" label="Related pictures">
                <ImageField source="domainImagePath"/>
            </ImageInput>
            <ImageField source="domainImagePath"/>
        </SimpleForm>
    </Edit>
);

export default ItemTypeEdit;

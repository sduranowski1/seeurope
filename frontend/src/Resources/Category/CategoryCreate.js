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
    ImageField, BooleanInput
} from 'react-admin';

const CategoryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="polishName" />
      <TextInput source="germanName" />
      {/*<ReferenceInput source="bid" reference="brands">*/}
      {/*  <SelectInput optionText="name" />*/}
      {/*</ReferenceInput>*/}
      {/*<DateInput source="createdAt" />*/}
      {/*<DateInput source="updatedAt" />*/}
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
            <ImageField source="src" title="title" />
        </ImageInput>
    </SimpleForm>
  </Create>
);

export default CategoryCreate;

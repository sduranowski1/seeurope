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
    ImageInput, required, BooleanInput
} from 'react-admin';

const VariantCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="variantname" />
        <TextInput source="polishName" />
        <TextInput source="germanName" />
        <ReferenceInput reference="brands" source="brand.id">
            <SelectInput
                label="Brand"
                source="brand.id"
                optionText={(record) => record?.name}
                validate={required()}
            />
        </ReferenceInput>
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

      {/*<DateInput source="createdAt" />*/}
      {/*<DateInput source="updatedAt" />*/}
        <ImageInput source="pictures" label="Related pictures">
            <ImageField source="src" title="title" />
        </ImageInput>
    </SimpleForm>
  </Create>
);

export default VariantCreate;

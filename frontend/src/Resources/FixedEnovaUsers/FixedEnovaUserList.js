import * as React from 'react';
import {List, Datagrid, TextField, DateField, NumberField, TextInput, SearchInput} from 'react-admin';
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const postFilters = [
  <SearchInput source="imie" placeholder="Search by name" alwaysOn/>,
  // <SearchInput source="code" placeholder="Search by code" alwaysOn/>
  // <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];

const FixedEnovaUserList = () => (
    <List resource="test_enova_contact_people" filters={postFilters}  pagination={<AdminPagination />}>
      <Datagrid>
        <TextField source="id" />
        {/*<TextField source="contractor.idEnova" />*/}
        <TextField source="imie" />
        <TextField source="nazwisko" />
        <TextField source="contractor.nazwa" />
        {/*<TextField source="productInfo.brand.name" label="Brand" />*/}
        {/*<TextField source="productInfo.variant.variantname" label="Variant" />*/}
        {/*<TextField source="productInfo.category.name" label="Category" />*/}
        {/*<TextField source="productInfo.subcategory.subCatName" label="Subcategory" />*/}
        {/*<TextField source="stockStatus" />*/}
        {/*<NumberField source="quantity" />*/}
        {/*<DateField source="updatedAt" />*/}
      </Datagrid>
    </List>
);

export default FixedEnovaUserList;
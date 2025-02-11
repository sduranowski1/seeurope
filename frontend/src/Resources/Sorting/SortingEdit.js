import React from 'react';
import { Edit, SimpleForm, SelectInput } from 'react-admin';
import "../../mui_fix.css";

// Define the choices for the dropdowns
const sortFieldChoices = [
    { id: 'id', name: 'ID' },
    { id: 'name', name: 'Name' },
    { id: 'createdAt', name: 'Created Date' },
    { id: 'updatedAt', name: 'Updated Date' },
];

const sortOrderChoices = [
    { id: 'asc', name: 'Ascending' },
    { id: 'desc', name: 'Descending' },
];

const SortingEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            {/* Sort Field dropdown */}
            <SelectInput source="sortField" choices={sortFieldChoices} />

            {/* Sort Order dropdown */}
            <SelectInput source="sortOrder" choices={sortOrderChoices} />
        </SimpleForm>
    </Edit>
);

export default SortingEdit;

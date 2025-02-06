import * as React from 'react';
import { List, Datagrid, TextField, SearchInput } from 'react-admin';
import { Link } from "react-router-dom";
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const postFilters = [
    <SearchInput source="nazwa" placeholder="Search by name" alwaysOn />,
];

const EnovaContractorList = () => (
    <List resource="enova_contractors" filters={postFilters} pagination={<AdminPagination />}>
        <Datagrid rowClick="edit"> {/* This makes the entire row clickable */}
            <TextField source="id" />
            <TextField source="nazwa" />
        </Datagrid>
    </List>
);

export default EnovaContractorList;
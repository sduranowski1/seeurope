import * as React from 'react';
import {List, Datagrid, TextField, SearchInput, useNotify, useRefresh, Button} from 'react-admin';
import { Link } from "react-router-dom";
import {AdminPagination} from "../../Components/AdminPagination/AdminPagination";

const postFilters = [
    <SearchInput source="nazwa" placeholder="Search by name" alwaysOn />,
];

const EnovaContractorList = () => {
    const notify = useNotify();
    const refresh = useRefresh();
    const [loading, setLoading] = React.useState(false);  // Track the loading state

    const handleFetchEnovaContractors = async () => {
        setLoading(true);  // Set loading to true when the request starts
        try {
            // Replace with your actual fetch logic
            const response = await fetch('https://seequipment.pl/api/fetch-enova-contractors', { method: 'POST' });

            if (response.ok) {
                notify('Enova contractors fetched successfully', 'info');
                refresh();  // Refresh the list to show updated data
            } else {
                throw new Error('Failed to fetch Enova contractors');
            }
        } catch (error) {
            notify('Error: ' + error.message, 'warning');
        } finally {
            setLoading(false);  // Set loading to false when the request finishes (success or failure)
        }
    };

    return (
        <List resource="enova_contractors" filters={postFilters} pagination={<AdminPagination />}>
            <Button label={loading ? "Fetching..." : "Fetch Enova Contractors"} onClick={handleFetchEnovaContractors} disabled={loading}>
                {loading && (
                    <span>
                    </span>
                )}
            </Button>
            <Datagrid rowClick="edit"> {/* This makes the entire row clickable */}
                <TextField source="id" />
                <TextField source="nazwa" />
            </Datagrid>
        </List>
    )
};

export default EnovaContractorList;
import React, { useState, useEffect } from 'react';
import { Edit, SimpleForm, TextInput, BooleanInput, NumberInput, Button, SelectInput, useRecordContext } from 'react-admin';
import "../../mui_fix.css";

const roles = [
    { id: 'ROLE_USER', name: 'User' }, // Display "User" for ROLE_USER
    { id: 'ROLE_ADMIN', name: 'Admin' }, // Display "Admin" for ROLE_ADMIN
];

// Format function: Converts the roles value to an array for the SelectInput
const formatRoles = (roles) => {
    console.log('Original roles:', roles); // Log the original value
    if (!roles) return ['ROLE_USER'];
    if (typeof roles === 'string') {
        const formattedRoles = roles.split(',').map(role => role.trim());
        console.log('Formatted roles:', formattedRoles); // Log the formatted value
        return formattedRoles;
    }
    return Array.isArray(roles) ? roles : [roles];
};

const parseRoles = (roles) => {
    console.log('Parsed roles:', roles); // Log the parsed value
    if (!roles) return ['ROLE_USER'];
    return Array.isArray(roles) ? roles : [roles];
};

const RolesButton = ({ onClick }) => {
    const record = useRecordContext(); // Get the current record
    const fetchedRoles = record?.roles || ['ROLE_USER']; // Fetch roles from the record, default to ['ROLE_USER']

    // Map role IDs to role names
    const roleNames = fetchedRoles.map(roleId => {
        const role = roles.find(r => r.id === roleId);
        return role ? role.name : roleId; // Fallback to roleId if name is not found
    }).join(', '); // Join multiple roles with a comma

    return (
        <Button onClick={onClick} label={["Priviliges: ", roleNames] || "Edit Roles"} />
    );
};

const UserEdit = (props) => {
    const [showSelectInput, setShowSelectInput] = useState(false);

    const handleButtonClick = () => {
        setShowSelectInput(!showSelectInput); // Toggle visibility of the SelectInput
    };

    return (
        <Edit {...props}>
            <SimpleForm>
                {/*<TextInput source="id" disabled />*/}
                <TextInput source="email" />
                <TextInput source="firstname" />
                <TextInput source="surname" />
                <TextInput source="company" />
                <TextInput source="address" />
                <TextInput source="zipCode" />
                <TextInput source="country" />
                <NumberInput source="phone" />
                <TextInput source="machineType" />
                <TextInput source="consideredProducts" />
                <TextInput source="message" />
                <RolesButton onClick={handleButtonClick} />
                {showSelectInput && (
                    <SelectInput
                        source="roles"
                        choices={roles}
                        defaultValue={['ROLE_USER']} // Default to ['ROLE_USER']
                        optionText="name" // Display the "name" field (User/Admin) in the dropdown
                        optionValue="id" // Use the "id" field (ROLE_USER/ROLE_ADMIN) as the value
                        multiple // Allow multiple roles to be selected
                        format={formatRoles} // Ensures roles are formatted correctly when displayed
                        parse={parseRoles}   // Ensures roles are parsed correctly before sending to the backend
                        disableClearable // Prevents the clear button from appearing
                    />
                )}
                <BooleanInput source="enabled" />
            </SimpleForm>
        </Edit>
    );
};

export default UserEdit;
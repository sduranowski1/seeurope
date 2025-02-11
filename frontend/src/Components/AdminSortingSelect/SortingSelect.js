import { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

const SortingSelect = ({ onSortChange }) => {
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    // Fetch sorting settings from API
    useEffect(() => {
        const fetchSortingSettings = async () => {
            try {
                const response = await fetch("https://se-europe-test.pl/api/global_settings");
                const data = await response.json();
                console.log("Fetched Sorting Settings:", data);
                setSortField(data.sortField || "id");
                setSortOrder(data.sortOrder || "asc");
            } catch (error) {
                console.error("Error fetching sorting settings:", error);
            }
        };

        fetchSortingSettings();
    }, []);

    // Handle sorting change
    const handleSortChange = (field, order) => {
        setSortField(field);
        setSortOrder(order);
        onSortChange(field, order);
    };

    return (
        <Box display="flex" gap={2}>
            {/* Sort Field Dropdown */}
            <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={sortField}
                    onChange={(e) => handleSortChange(e.target.value, sortOrder)}
                >
                    <MenuItem value="id">Sort by Id</MenuItem>
                    <MenuItem value="name">Sort by Name</MenuItem>
                    <MenuItem value="createdAt">Sort by Created Date</MenuItem>
                    <MenuItem value="updatedAt">Sort by Updated Date</MenuItem>
                </Select>
            </FormControl>

            {/* Sort Order Dropdown */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Order</InputLabel>
                <Select
                    value={sortOrder}
                    onChange={(e) => handleSortChange(sortField, e.target.value)}
                >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SortingSelect;

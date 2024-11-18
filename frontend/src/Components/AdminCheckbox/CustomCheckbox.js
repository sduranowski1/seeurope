// CustomCheckbox.js

import React from 'react';
import { Checkbox } from '@mui/material';
import {styled} from "@mui/material/styles"; // Import the SCSS for the checkbox

// Custom Checkbox Component
const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

export default CustomCheckbox;

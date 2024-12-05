import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import {useNavigate} from "react-router-dom";

const Submenu = ({ text, name, icon, children }) => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (name) {
            navigate(`/admin/${name}`); // Redirect to the resource's route
            setOpen(!open); // Toggle collapse if no name provided
        }
    };

    return (
        <>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    {open ? <ExpandLess /> : icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </MenuItem>
            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
                sx={{
                    '& .RaMenuItemLink-icon': {
                        paddingLeft: 2
                    }
                }}
            >
                {children}
            </Collapse>
        </>
    );
};

export default Submenu;
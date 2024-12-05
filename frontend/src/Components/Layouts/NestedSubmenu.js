import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";

const NestedSubmenu = ({ text, name, icon, children, style }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (name) {
            navigate(`/admin/${name}`); // Redirect to the resource's route
        } else {
            setOpen(!open); // Toggle collapse if no name provided
        }
    };

    const hasNestedSubmenu = React.Children.toArray(children).some(child => child.type && child.type.name === "Submenu");

    return (
        <>
            <MenuItem onClick={handleClick} sx={{ ...style }}>
                <ListItemIcon sx={{ paddingLeft: hasNestedSubmenu ? 3 : 0 }}>
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
                        paddingLeft: hasNestedSubmenu ? 3 : 0,
                    }
                }}
            >
                {children}
            </Collapse>
        </>
    );
};

export default NestedSubmenu;

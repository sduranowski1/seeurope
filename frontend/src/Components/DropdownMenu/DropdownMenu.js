import './DropdownMenu.scss';

import React from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import {MyCoupling} from "../../pages/MyCoupling/MyCoupling";

export const DropdownMenu = (props) => {

    return (
        <ul className="nav__submenu">
            { props.linksList.map(link => {
                return (
                    <li className="nav__submenu-item ">
                        <a href={link.url}>{link.linkName}</a>
                    </li>
                )
            })}
        </ul>
    );
}
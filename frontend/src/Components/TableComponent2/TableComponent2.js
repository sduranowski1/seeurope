import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {BoxWithCheckboxes} from "../BoxWithCheckboxes/BoxWithCheckboxes";
import {useEffect, useState} from "react";


export const TableComponent2 = (props) => {

    function isChecked(product) {
        if(Object.entries(props.checkboxes).filter(checkbox => checkbox[1] === true).length === 0 ||
            Object.entries(props.checkboxes).filter(checkbox => checkbox[1] === true).map(checkbox => checkbox[0]).includes(product.coupling)) {
            return product;
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Object.keys(props.data[0]).map(tableCell => {
                            return (<TableCell >{tableCell}</TableCell>);
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.filter(product => isChecked(product)).map(product => {
                        const fields = Object.values(product);
                        return (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {fields.map(field => {
                                    return <TableCell>{field}</TableCell>;
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
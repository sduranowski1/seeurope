import './TableWithTabs.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {TableComponent} from "../TableComponent/TableComponent";

export const TableWithTabs = (props) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        { Object.keys(props.productsData.tableData).map((name, i) => {
                            return (
                                <Tab label={name} value={`${i+1}`} key={i} />
                            )
                        })}
                    </TabList>
                </Box>

                { Object.values(props.productsData.tableData).map((table, i) => {
                    return (
                        <TabPanel key={i} value={`${i+1}`}>
                            <TableComponent data={table} displayedItems={props.displayedItems} checkboxes={props.checkboxes}/>
                        </TabPanel>
                    )
                })}
            </TabContext>
        </Box>
    );
}
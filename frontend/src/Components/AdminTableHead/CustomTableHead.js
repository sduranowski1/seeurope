import {styled} from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";

const CustomTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    '& .MuiTableCell-head': {
        fontWeight: 'bold',
        fontSize: '0.875rem',
        color: '#000 !important', // Black color for the text
    },
    '& .MuiTableSortLabel-root': {
        display: 'flex',
        alignItems: 'center',
    },
}));

export default CustomTableHead;

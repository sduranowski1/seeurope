import React from 'react';
import { Button, Box } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';

const ExportButton = ({ data, fileName }) => {
    const handleExport = () => {
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName || 'export'}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button
            variant="text"
            color="primary"
            size="small"
            startIcon={<GetAppIcon />}
            onClick={handleExport}
            style={{ marginLeft: 'auto', display: 'flex' }}
        >
            Export
        </Button>
    );
};

export default ExportButton;

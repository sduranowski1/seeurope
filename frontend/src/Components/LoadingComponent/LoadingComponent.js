import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingComponent = () => {
    return (
        <section className="section-contrains tables-page">
            <div className="loading-container">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="40vh" // Or use specific height if you want it in a smaller area
                    width="100%"
                >
                    <CircularProgress />
                </Box>
            </div>
        </section>
    );
};

export default LoadingComponent;

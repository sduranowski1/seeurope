import React from 'react';
import Slider from '@mui/material/Slider';
import Box from "@mui/material/Box";

export const WeightRange = ({ weightRange, maxWeight, onChange }) => {
    return (
        <div>
            {/*<h3>Filter by Weight</h3>*/}
            <Box className={'slider-container'}>
                <Slider
                    value={weightRange}
                    onChange={onChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}kg`}
                    min={0}
                    max={maxWeight}
                    marks={[
                        { value: 0, label: "0 kg" },
                        { value: maxWeight / 2, label: `${Math.round(maxWeight / 2)} kg` },
                        { value: maxWeight, label: `${maxWeight} kg` },
                    ]}
                />
            </Box>
        </div>
    );
};

import './SliderRangeComponent.scss'

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}kg`;
}

export const SliderRangeComponent = (props) => {

    const maximumWeight = Object.values(props.productsData.tableData).flat()
        .reduce((acc, product) => acc?.weight > product.weight ? acc : product, {})
        .weight + 1;

    const [value, setValue] = React.useState([0, maximumWeight]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.setDiplayedItems(value);
    };

    return (
        <Box className={'slider-container'}>
            <Slider
                getAriaLabel={() => 'Capacity range'}
                value={value}
                max={maximumWeight}
                onChange={handleChange}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}
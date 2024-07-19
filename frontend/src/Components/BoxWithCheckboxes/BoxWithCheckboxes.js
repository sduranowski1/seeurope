import './BoxWithCheckboxes.scss'
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel} from "@mui/material";
import {useState} from "react";

export const BoxWithCheckboxes = (props) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        props.setCheckboxes({[props.label]: !checked});
        props.setCheckboxes({...props.checkboxes, [props.label] : !checked});
    };

    return (
        <FormControlLabel control={
            <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        } label={props.label} />
    );
}
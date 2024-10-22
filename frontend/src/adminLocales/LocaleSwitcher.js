import * as React from "react";
// import Button from '@material-ui/core/Button';
import { useSetLocale } from 'react-admin';
import {Button} from "@mui/material";

const LocaleSwitcher = () => {
    const setLocale = useSetLocale();
    return (
        <div>
            <div>Language</div>
            <Button onClick={() => setLocale('en')}>English</Button>
            <Button onClick={() => setLocale('pl')}>Polish</Button>
        </div>
    );
};

export default LocaleSwitcher;
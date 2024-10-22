// in src/MyAppBar.js
import {AppBar, LocalesMenuButton, TitlePortal} from 'react-admin';
import { Typography } from '@mui/material';
import LocaleSwitcher from "../adminLocales/LocaleSwitcher";

export const MyAppBar = () => <AppBar color="primary" >                        <TitlePortal /><LocalesMenuButton languages={[
    { locale: 'en', name: 'English' },
    { locale: 'pl', name: 'Polski' },
]} />
</AppBar>;
// in src/MyLayout.js
import { Layout } from 'react-admin';
import { MyAppBar } from './CustomAppBar';
import {AdminMyMenu} from "../Components/Layouts/AdminMyMenu";

export const MyLayout = ({ children }) => (
    <Layout appBar={MyAppBar}  menu={AdminMyMenu}>
        {children}
    </Layout>
);
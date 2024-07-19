// in src/MyLayout.js
import { Layout } from 'react-admin';
import { MyAppBar } from './CustomAppBar';

export const MyLayout = ({ children }) => (
    <Layout appBar={MyAppBar}>
        {children}
    </Layout>
);
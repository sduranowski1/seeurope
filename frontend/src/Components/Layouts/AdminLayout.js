// src/components/Admin/AdminToolbar.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthContext from "../../AuthContext";
import dataProvider from "../../dataProvider";
import {Admin, Resource} from "react-admin";
import authProvider from "../../authProvider";
import {MyLayout} from "../../Layouts/AdminToolbar";
import i18nProvider from "../../i18nProvider";
import EnovaProductListOld from "../../Resources/EnovaProduct/EnovaProductListOld";
import EnovaProductEdit from "../../Resources/EnovaProduct/EnovaProductEdit";
import InventoryIcon from "@mui/icons-material/Inventory";
import EnovaContractorListOld from "../../Resources/EnovaContractors/EnovaContractorListOld";
import GroupIcon from "@mui/icons-material/Group";
import BrandList from "../../Resources/Brand/BrandList";
import BrandEdit from "../../Resources/Brand/BrandEdit";
import BrandCreate from "../../Resources/Brand/BrandCreate";
import AppsIcon from "@mui/icons-material/Apps";
import VariantList from "../../Resources/Variant/VariantList";
import VariantEdit from "../../Resources/Variant/VariantEdit";
import VariantCreate from "../../Resources/Variant/VariantCreate";
import CategoryList from "../../Resources/Category/CategoryList";
import CategoryEdit from "../../Resources/Category/CategoryEdit";
import CategoryCreate from "../../Resources/Category/CategoryCreate";
import ClassIcon from "@mui/icons-material/Class";
import SubcategoryList from "../../Resources/Subcategory/SubcategoryList";
import SubcategoryEdit from "../../Resources/Subcategory/SubcategoryEdit";
import SubcategoryCreate from "../../Resources/Subcategory/SubcategoryCreate";
import ItemTypeList from "../../Resources/ItemType/ItemTypeList";
import ItemTypeEdit from "../../Resources/ItemType/ItemTypeEdit";
import ItemTypeCreate from "../../Resources/ItemType/ItemTypeCreate";
import UserList from "../../Resources/User/UserList";
import UserEdit from "../../Resources/User/UserEdit";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {AdminMyMenu} from "./AdminMyMenu";
import ViewListIcon from "@mui/icons-material/ViewList";
import EnovaUserList from "../../Resources/EnovaUsers/EnovaUserList";
import EnovaUserEdit from "../../Resources/EnovaUsers/EnovaUserEdit";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EnovaDbProductList from "../../Resources/EnovaProduct/EnovaDbProductList";
import EnovaContractorEdit from "../../Resources/EnovaContractors/EnovaContractorEdit";
import UserCreate from "../../Resources/User/UserCreate";
import EnovaProductList from "../../Resources/EnovaProduct/EnovaProductList";
import EnovaContractorList from "../../Resources/EnovaContractors/EnovaContractorList";
import SortingList from "../../Resources/Sorting/SortingList";
import SortingEdit from "../../Resources/Sorting/SortingEdit";



const AdminLayout = () => {
    // Access token from context to pass to react-admin authProvider
    const { token } = React.useContext(AuthContext);

    // Example: Adding debug information for `dataProvider` or props
    React.useEffect(() => {
        dataProvider.getList('brands', {
            pagination: { page: 1, perPage: 1 },
            sort: { field: 'id', order: 'ASC' },
            filter: {},
        }).then(response => {
            console.log("Sample Brand Data:", response);
        }).catch(error => {
            console.error("Error fetching brands:", error);
        });
    }, []);

    return (
        <Admin dataProvider={dataProvider} authProvider={authProvider} layout={MyLayout} locale="en" i18nProvider={i18nProvider} basename="/admin">
            {/*<Resource name="products" list={ProductList} edit={ProductEdit} />*/}
            {/*<Resource name="enova-products" list={EnovaDbProductList} edit={EnovaProductEdit} icon={InventoryIcon} />*/}
            <Resource name="enova_products" list={EnovaProductList} edit={EnovaProductEdit} icon={InventoryIcon} />
            <Resource name="enova_contractors" list={EnovaContractorList} edit={EnovaContractorEdit} icon={GroupIcon}/>
            <Resource name="enova_people" list={EnovaUserList} edit={EnovaUserEdit} icon={PermIdentityIcon}/>
            <Resource name="brands" list={BrandList} edit={BrandEdit} create={BrandCreate} icon={AppsIcon}/>
            <Resource name="variants" list={VariantList} edit={VariantEdit} create={VariantCreate} />
            <Resource name="categories" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} icon={ClassIcon}/>
            <Resource name="subcategories" list={SubcategoryList}  edit={SubcategoryEdit} create={SubcategoryCreate}/>
            <Resource name="item_types" list={ItemTypeList} edit={ItemTypeEdit} create={ItemTypeCreate} />
            <Resource name="submissions" list={UserList} edit={UserEdit} create={UserCreate} icon={PersonAddAlt1Icon} />
            <Resource name="global_settings" list={SortingList} edit={SortingEdit} icon={PersonAddAlt1Icon}/>
            {/* Other resources... */}
        </Admin>
    );
};

export default AdminLayout;

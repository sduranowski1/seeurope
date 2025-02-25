import { Menu } from 'react-admin';
import Submenu from "./Submenu";
import LabelIcon from '@mui/icons-material/Label';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import InventoryIcon from "@mui/icons-material/Inventory";
import ViewListIcon from '@mui/icons-material/ViewList';
import AppsIcon from "@mui/icons-material/Apps";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ClassIcon from "@mui/icons-material/Class";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NestedSubmenu from "./NestedSubmenu";

export const AdminMyMenu = () => (
    <Menu>
        <Menu.ResourceItem name="enova_products" />
        <Menu.ResourceItem name="enova_contractors" />
        <Menu.ResourceItem name="enova_people" />
        {/*<Menu.ResourceItem name="brands" icon={<AppsIcon />}/>*/}
        <Submenu text="Brands" name="brands" icon={<AppsIcon />}>
            <Menu.ResourceItem name="variants" />
            <Menu.ResourceItem name="coupling_filters" />
        </Submenu>
        {/*<Menu.ResourceItem name="categories" icon={<ClassIcon />}/>*/}
        <Submenu text="Categories" name="categories" icon={<ClassIcon />}>
            <Submenu text="Subcategories" name="subcategories" icon={<ViewListIcon style={{ paddingLeft: '10px' }}/>}>
                <Menu.ResourceItem name="item_types" icon={<ViewListIcon style={{ paddingLeft: '10px'}}/>} />
                <Menu.ResourceItem name="machine_filters" icon={<ViewListIcon style={{ paddingLeft: '10px'}}/>} />

            </Submenu>
        </Submenu>
        <Menu.ResourceItem name="features_lists" />
        <Menu.ResourceItem name="submissions" />
        <Menu.ResourceItem name="global_settings" />
    </Menu>
);
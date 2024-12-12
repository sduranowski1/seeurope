import React, {useState, useEffect, createContext} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import BookList from './Resources/Book/BookList';
import UserList from './Resources/User/UserList';
import HomePage from './Pages/HomePage/HomePage';
import Login from "./Components/Login";
import {Dashboard} from "./Components/Dashboard";
import Layout from "./Layouts/Layout";
import Logout from "./Components/Logout"; // Your protected component for /dashboard
import AuthContext from "./AuthContext";
import './mui_fix.css'
import i18nProvider from './i18nProvider';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import AppsIcon from '@mui/icons-material/Apps';
import ClassIcon from '@mui/icons-material/Class';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import MyLayout from "./Components/Layouts/AdminLayout";

import {NavbarComponent} from "./Components/NavbarComponent/NavbarComponent";
import {SidebarComponent} from "./Components/SidebarComponent/SidebarComponent";
import Sidebar from "./Components/SidebarComponent/Sidebar";
import {MyCoupling} from "./Pages/MyCoupling/MyCoupling";
import {Se} from "./Pages/Se/Se";
import {ThreePoint} from "./Pages/ThreePoint/ThreePoint";
import {MyMachine} from "./Pages/MyMachine/MyMachine";
import {WheelLoader} from "./Pages/WheelLoader/WheelLoader";
import {Excavator} from "./Pages/Excavator/Excavator";
import {Tractor} from "./Pages/Tractor/Tractor";
import {TelescopicHandler} from "./Pages/TelescopicHandler/TelescopicHandler";
import {Forklift} from "./Pages/Forklift/Forklift";
import {ProductDetails} from "./Pages/Product/ProductDetails";
import {WithoutCoupling} from "./Pages/WithoutCoupling/WithoutCoupling";
import {Contact} from "./Pages/Contact/Contact";
import {ThisIsSe} from "./Pages/ThisIsSe/ThisIsSe";
import {Sustainability} from "./Pages/Sustainability/Sustainability";
import {FindReseller} from "./Pages/FindReseller/FindReseller";
import {MyPage} from "./Pages/MyPage/MyPage";
import {MyDetails} from "./Pages/MyDetails/MyDetails";
import {OrderOverview} from "./Pages/OrderOverview/OrderOverview";
import {InvoiceOverview} from "./Pages/InvoiceOverview/InvoiceOverview";
import {NewCustomer} from "./Pages/NewCustomer/NewCustomer";
import {HowToShop} from "./Pages/HowToShop/HowToShop";
import {HowToSearch} from "./Pages/HowToSearch/HowToSearch";
import {SecurityCookies} from "./Pages/SecurityCookies/SecurityCookies";
import {Delivery} from "./Pages/Delivery/Delivery";
import {MyAccount} from "./Pages/MyAccount/MyAccount";
import ProductList from "./Resources/Product/ProductList";
import {Register} from "./Pages/Register/Register";
import UserEdit from "./Resources/User/UserEdit";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import {MyLayout} from "./Layouts/AdminToolbar";
import CustomAppBar, {MyAppBar} from "./Layouts/CustomAppBar";
import {useTranslation} from "react-i18next";
import {useTranslationContext} from "./TranslationContext";
import ProductEdit from "./Resources/Product/ProductEdit";
import {ProductProvider} from "./ProductProvider";
import BrandList from "./Resources/Brand/BrandList";
import BrandEdit from "./Resources/Brand/BrandEdit";
import VariantList from "./Resources/Variant/VariantList";
import VariantEdit from "./Resources/Variant/VariantEdit";
import VariantCreate from "./Resources/Variant/VariantCreate";
import BrandCreate from "./Resources/Brand/BrandCreate";
import EnovaProductList from "./Resources/EnovaProduct/EnovaProductList";
import EnovaContractorList from "./Resources/EnovaContractors/EnovaContractorList";
import EnovaProductEdit from "./Resources/EnovaProduct/EnovaProductEdit";
import BlankPage from "./Pages/Admin/EnovaProducts/BlankPage";
import CategoryList from "./Resources/Category/CategoryList";
import CategoryEdit from "./Resources/Category/CategoryEdit";
import CategoryCreate from "./Resources/Category/CategoryCreate";
import SubcategoryList from "./Resources/Subcategory/SubcategoryList";
import SubcategoryEdit from "./Resources/Subcategory/SubcategoryEdit";
import {StaticForklift} from "./Pages/Forklift/StaticForklift";
import {Category} from "./Pages/Category/Category";
import {Brand} from "./Pages/Brand/Brand";
import {ProductDetailsForBrands} from "./Pages/Product/ProductDetailsForBrands";
import SubcategoryCreate from "./Resources/Subcategory/SubcategoryCreate";
import ItemTypeList from "./Resources/ItemType/ItemTypeList";
import ItemTypeCreate from "./Resources/ItemType/ItemTypeCreate";
import ItemTypeEdit from "./Resources/ItemType/ItemTypeEdit";
import AdminLayout from "./Components/Layouts/AdminLayout";
import {Subcategory} from "./Pages/Subcategory/Subcategory";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
// import BrandEdit from "./Resources/Product/BrandEdit";
// import {SidebarComponent} from "./Components/SidebarComponent/SidebarComponent";
// import {FooterComponent} from "./Components/FooterComponent/FooterComponent";


export const Context = createContext(false)
export const ProductContext = createContext(false);


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [toggleSidebar, setToggleSidebar] = useState(false);
    const [email, setEmail] = useState('');



    useEffect(() => {
    // Check if token exists in localStorage to maintain session
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    console.log('Logged in with token:', newToken); // Console log the token on login
  };

  return (
      <ProductProvider>
    <Router>
      <Context.Provider value={[toggleSidebar, setToggleSidebar]}>

      <AuthContext.Provider value={{ email, token, setToken: handleLogin }}>
      {/*<SidebarComponent />*/}
      <Sidebar setToken={handleLogin} />
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/login" element={
            !token ? <Layout><Login setToken={handleLogin} /></Layout> : <Navigate to="/dashboard" replace />
          } />          <Route path="/logout" element={<Logout />} />
                      <Route path="dashboard" element={<PrivateRoute />}>
                          <Route path="" element={<Layout><Dashboard /></Layout>} />
            </Route>
            <Route path="/admin/*" element={<AdminLayout />} >
                <Route path="enova-product/:id" element={<EnovaProductEdit />} />
            </Route>
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          {/*<Route path="/moje-zlacze">*/}
          <Route path="/my-coupling">
              <Route index  element={<Layout><MyCoupling /></Layout>} />
              {/*<Route path=":brand" element={<Layout><Se /></Layout>} />*/}
              <Route path=":brand" element={<Layout><Brand /></Layout>} />
              <Route path=":brand/:slug" element={<Layout><ProductDetailsForBrands /></Layout>} />
              {/*<Route path="100838" element={<Layout><Se/></Layout>} />*/}
              {/*<Route path="3-punkt" element={<Layout><ThreePoint /></Layout>} />*/}
          </Route>
          {/*<Route path="/moja-maszyna">*/}
          <Route path="/my-machine">
              <Route index element={<Layout><MyMachine /></Layout>} />
              <Route path=":category" element={<Layout><Category /></Layout>} />
              <Route path=":category/:slug" element={<Layout><ProductDetails /></Layout>} />
              <Route path=":category/:subcategory/:slug" element={<Layout><Subcategory /></Layout>} />
              <Route path="ladowarka-kolowa" element={<Layout><WheelLoader /></Layout>} />
              <Route path="koparka" element={<Layout><Excavator /></Layout>} />
              <Route path="traktor" element={<Layout><Tractor /></Layout>} />
              <Route path="ladowarka-teleskopowa" element={<Layout><TelescopicHandler /></Layout>} />
              <Route path="wozek-widlowy" element={<Layout><StaticForklift /></Layout>} />
              {/*<Route path="forklift" element={<Layout><Forklift /></Layout>} />*/}
              {/*<Route path="forklift/:slug" element={<Layout><ProductDetails /></Layout>} />*/}

              <Route path="bez-zlacz" element={<Layout><WithoutCoupling /></Layout>} />
          </Route>
          <Route path="/o-nas">
              <Route path="kontakt" element={<Layout><Contact /></Layout>} />
              <Route path="to-jest-se" element={<Layout><ThisIsSe /></Layout>} />
              <Route path="zrownowazony-rozwoj" element={<Layout><Sustainability /></Layout>} />
              <Route path="znajdz-posrednika" element={<Layout><FindReseller /></Layout>} />
          </Route>
          <Route path="/moje-konto" element={<Layout><PrivateRoute /></Layout>} >
              <Route path="moja-strona" element={<Layout><MyPage /></Layout>} />
              <Route path="moje-dane" element={<Layout><MyDetails /></Layout>} />
              <Route path="przeglad-zamowien" element={<Layout><OrderOverview /></Layout>} />
              <Route path="przeglad-faktur" element={<Layout><InvoiceOverview /></Layout>} />
          </Route>
          <Route path="/pomoc-nowy-klient" element={<Layout><NewCustomer /></Layout>} />
          <Route path="/pomoc-jak-zamawiac" element={<Layout><HowToShop /></Layout>} />
          <Route path="/pomoc-jak-szukac" element={<Layout><HowToSearch /></Layout>} />
          <Route path="/pomoc-bezpieczenstwo-cookies" element={<Layout><SecurityCookies /></Layout>} />
          <Route path="/pomoc-dostawa" element={<Layout><Delivery /></Layout>} />
          <Route path="/pomoc-moje-konto" element={<Layout><MyAccount /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
        </Routes>
      </AuthContext.Provider>
      </Context.Provider>
    </Router>
      </ProductProvider>
  );
};

export default App;

// src/Components/Layout.js
import React from 'react';
import Header from './Header';
import {NavbarComponent} from "../Components/NavbarComponent/NavbarComponent";
import Sidebar from "../Components/SidebarComponent/Sidebar";
import {FooterComponent} from "../Components/FooterComponent/FooterComponent";

const Layout = ({ children }) => {
  return (
    <>
      {/*<Header />*/}
      <NavbarComponent />
      {/*<Sidebar />*/}

      <main>{children}</main>
      <FooterComponent />
    </>
  );
};

export default Layout;

// src/Components/Layout.js
import React from 'react';
import Header from './Header';
import {NavbarComponent} from "../Components/NavbarComponent/NavbarComponent";
import Sidebar from "../Components/SidebarComponent/Sidebar";
import {FooterComponent} from "../Components/FooterComponent/FooterComponent";
import dataProvider from "../dataProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const Layout = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <>
      {/*<Header />*/}
        <QueryClientProvider client={queryClient}>
      <NavbarComponent dataProvider={dataProvider} />
        </QueryClientProvider>
      {/*<Sidebar />*/}

      <main>{children}</main>
      <FooterComponent />
    </>
  );
};

export default Layout;

import React from 'react';
import Navbar from './Navbar';
import Sidenav from './Sidenav';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    {/* <Sidenav /> */}
    <main>{children}</main>
  </div>
);

export default Layout;
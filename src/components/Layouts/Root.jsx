import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../../Pages/Shared/Nav';
import Footer from '../../Pages/Shared/Footer';

const Root = () => {
    return (
        <>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Root;
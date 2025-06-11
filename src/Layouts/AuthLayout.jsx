import React from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '../SharedComponents/Navbar';
import { Outlet } from 'react-router';
import Footer from '../SharedComponents/Footer';


const AuthLayout = () => {
                return (
                                <div>
                                                <ToastContainer></ToastContainer>
                                                <header>
                                                                <Navbar></Navbar>
                                                </header>
                                                <main className='mt-5'>
                                                                <Outlet></Outlet>
                                                </main>
                                                <footer>
                                                                <Footer></Footer>
                                                </footer>
                                </div>
                );
};

export default AuthLayout;
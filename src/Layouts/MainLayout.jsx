import React from "react";
import { Outlet } from "react-router";
import Navbar from "../SharedComponents/Navbar";
import Footer from "../SharedComponents/Footer";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div>
      <ToastContainer></ToastContainer>
      <header>
        <nav>
          <Navbar></Navbar>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer className="lg:w-11/12 lg:mx-auto mx-2 lg:mt-10 md:mt-7 mt-5">
                <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;

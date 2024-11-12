import React from 'react';
import NavBar from '../components/headers/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import Scroll from '../hooks/useScroll';
import AOS from 'aos';
import { useAuth } from '../hooks/useAuth';
import { HashLoader } from 'react-spinners';
const MainLayout = () => {
    const { loader } = useAuth();
    const location = useLocation();
    if (loader) {
        return <div className='flex justify-center items-center h-screen'>
            <HashLoader
                color="#97e8b7"
                size={50}
            />
        </div>
    }
    AOS.init();
     // Define paths where you want to hide the footer
     const hideFooterPaths = ['/classes', '/instructors'];
    return (
        <main className='dark:bg-black overflow-hidden'>
            <Scroll />
            <NavBar />
            <Outlet />
                {/* Conditionally render the footer */}
                {!hideFooterPaths.includes(location.pathname) && <Footer />}
            <ToastContainer />
        </main>
    );
};

export default MainLayout;
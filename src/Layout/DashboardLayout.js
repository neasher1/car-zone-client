import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useSeller from '../Hooks/useSeller';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <div>
            <Navbar></Navbar>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:justify-items-start max-w-[1440px] mx-auto">
                <ul className="menu p-4 w-80 text-white bg-gradient-to-r from-accent to-primary">
                    <li><Link className='btn btn-outline my-4' to='/dashboard'> My Dashboard</Link></li>
                    {
                        isBuyer &&
                        <>
                            <li><Link className='btn btn-outline my-4' to='/dashboard/my-orders'>My Orders</Link></li>
                        </>
                    }
                    {
                        isSeller &&
                        <>
                            <li><Link className='btn btn-outline my-4' to='/dashboard/add-product'>Add Product</Link></li>
                            <li><Link className='btn btn-outline my-4' to='/dashboard/my-products'>My Products</Link></li>
                        </>
                    }
                    {
                        isAdmin &&
                        <>
                            <li><Link className='btn btn-outline my-4' to='/dashboard/all-sellers'>All Sellers</Link></li>
                            <li><Link className='btn btn-outline my-4' to='/dashboard/all-buyers'>All Buyers</Link></li>
                            <li><Link className='btn btn-outline my-4' to='/dashboard/reported-items'>Reported Items</Link></li>
                        </>
                    }
                </ul>


                <div>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;
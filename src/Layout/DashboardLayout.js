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
    // w-full lg:w-2/5 md:w-2/5  mx-auto md:mx-auto lg:mr-16
    return (
        <div>
            <Navbar></Navbar>
            <div className="max-w-[1440px] mx-auto flex-none lg:flex">
                <div className='w-full lg:w-1/4 md:w-2/5 md:mx-auto bg-gradient-to-r from-accent to-primary'>
                    <ul className="menu p-4 text-white">
                        <div>
                            {
                                user?.email &&
                                <li><Link className='btn btn-outline my-4' to='/dashboard'>My Dashboard</Link></li>
                            }
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
                        </div>
                    </ul>
                </div>
                <div className='mx-auto'>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useSeller from '../Hooks/useSeller';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isAdmin] = useAdmin(user?.email);

    return (

        <div className='mx-auto'>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content px-5 md:px-14 my-16">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-80 lg:bg-opacity-0 text-white bg-gradient-to-r from-accent to-primary">
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
                                    {/* <li><Link className='btn btn-outline my-4' to='/dashboard/reported-items'>Reported Items</Link></li> */}
                                </>
                            }
                        </div>
                    </ul>

                </div>

            </div>

        </div>
    );
};

export default DashboardLayout;
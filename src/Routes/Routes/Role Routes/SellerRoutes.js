import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useSeller from '../../../Hooks/useSeller';

const SellerRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, sellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if (loading || sellerLoading) {
        return <div className="flex justify-center items-center space-x-2 my-20">
            <progress className="progress w-56"></progress>
        </div>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default SellerRoutes;
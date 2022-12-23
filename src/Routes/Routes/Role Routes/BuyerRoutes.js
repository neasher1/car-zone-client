import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useBuyer from '../../../Hooks/useBuyer';

const BuyerRoutes = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isBuyer, BuyerLoading] = useBuyer(user?.email);
    const location = useLocation();

    if (loading || BuyerLoading) {
        return <div className="flex justify-center items-center space-x-2 my-20">
            <progress className="progress w-56"></progress>
        </div>
    }

    if (user && isBuyer) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default BuyerRoutes;
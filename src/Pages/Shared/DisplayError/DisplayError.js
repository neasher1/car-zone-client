import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import img from "../../../Asstes/images/404.jpg";

const DisplayError = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const error = useRouteError();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Sign Out Successfully");
                navigate('/login');
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className='mx-auto m-16 flex items-center flex-col'>
            <h1 className='text-4xl text-error'>Oops!</h1>
            <p className='text-2xl'>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <img className='w-1/2 my-4' src={img} alt="img" />
            <p className='text-center text-2xl'>Please <Link onClick={handleLogOut} className='btn btn-primary'>Sign Out</Link> and logged back again</p>
        </div>
    );
};

export default DisplayError;
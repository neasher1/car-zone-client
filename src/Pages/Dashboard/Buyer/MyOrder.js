import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Spinner from '../../Shared/Spinner/Spinner';
import Order from './Order';

const MyOrder = () => {
    const { user } = useContext(AuthContext);

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/booking?email=${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    });

    if (isLoading) {
        return <Spinner></Spinner>;
    }

    return (
        <div className='my-6 mx-12'>
            <h2 className="text-3xl font-bold text-primary mb-6">My Orders</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-12'>
                {
                    orders?.map(order => <Order
                        key={order._id}
                        order={order}
                    ></Order>)
                }
            </div>
        </div>
    );
};

export default MyOrder;
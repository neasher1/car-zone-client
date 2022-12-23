import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import MyProductCard from './MyProductCard';

const MyProducts = () => {

    const { user } = useContext(AuthContext);
    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ['myProducts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/my-products?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    });

    const deleteProduct = (id) => {
        fetch(`http://localhost:5000/deleteproduct/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    toast.success("Deleted Item Successfully");
                }
            })
    };

    // handle advertisement
    const handleAdvertise = (id) => {
        fetch(`http://localhost:5000/advertise?id=${id}`, {
            method: 'POST',
        })
            .then(res => res.json())
            .then(res => {
                toast.success('Advertise Item Successfully');
                // update status on my product
                fetch(`http://localhost:5000/advertise?id=${id}`, {
                    method: 'PUT'
                })
                    .then(res => res.json())
                    .then(data => {
                        refetch();
                    })
            })
    }

    return (
        <div className='my-4 mx-6'>
            <h2 className="text-3xl font-bold text-primary">My Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1440px] mx-auto'>
                {
                    myProducts?.map(myProduct => <MyProductCard
                        key={myProduct._id}
                        myProduct={myProduct}
                        deleteProduct={deleteProduct}
                        handleAdvertise={handleAdvertise}
                    ></MyProductCard>)
                }
            </div>
        </div>
    );
};

export default MyProducts;
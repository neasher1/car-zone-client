import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSellers = () => {

    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allseller', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/allseller/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                toast.success('user delete successfully');
                refetch();
            })
    };

    const handleVerify = (id) => {
        fetch(`http://localhost:5000/verifyseller/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                toast.success('user verified')
                console.log(data)
                refetch();
            })
    }

    return (
        <div>
            <div className='card shadow-2xl p-8 m-4 w-full'>
                <h3 className="text-2xl mb-4">All Buyers</h3>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>Buyer Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers.map((user, i) => <tr key={user._id}>
                                    <td>{i + 1}</td>
                                    <td className='px-3'>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td ><button className='btn btn-danger text-center my-3' onClick={() => handleDelete(user._id)}>delete</button></td>
                                    <td >{user?.verified ? <><button className='btn btn-success my-3'>verified</button></> : <><button className='btn btn-success text-center my-3' onClick={() => handleVerify(user._id)}>Verify</button></>}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllSellers;
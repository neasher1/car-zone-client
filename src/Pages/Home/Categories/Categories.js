import React from 'react';
import { useQuery } from '@tanstack/react-query';

const Categories = () => {

    const { data: products = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            try {
                const res = await fetch('proData.json');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <div className='my-16'>
            <h2 className="text-3xl text-center font-bold">Categories:{products.length}</h2>

        </div>
    );
};

export default Categories;
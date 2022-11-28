import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Category from './Category';
import Spinner from '../../Shared/Spinner/Spinner';

const Categories = () => {

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/category');
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
        <div className='my-16'>
            <h2 className="text-3xl text-center font-bold">Categories:{categories.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 my-12  max-w-[1440px] mx-auto'>
                {
                    categories.map(category => <Category
                        key={category._id}
                        category={category}
                    ></Category>)
                }
            </div>
        </div>
    );
};

export default Categories;
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CarCategory from './CarCategory';

const CarCategories = () => {

    const cars = useLoaderData();

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 my-12  max-w-[1440px] mx-auto'>
            {
                cars.map(car => <CarCategory
                    key={car._id}
                    car={car}
                ></CarCategory>)
            }
        </div>
    );
};

export default CarCategories;


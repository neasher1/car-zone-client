import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import CarCategory from './CarCategory';

const CarCategories = () => {

    const cars = useLoaderData();
    const [bookCars, setBookCars] = useState(null);

    return (
        <section className='max-w-[1440px] mx-auto my-16'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20'>
                {
                    cars.map(car => <CarCategory
                        key={car._id}
                        car={car}
                        setBookCars={setBookCars}
                    ></CarCategory>)
                }
            </div>
            {
                bookCars &&
                <BookingModal
                    bookCars={bookCars}
                    setBookCars={setBookCars}
                ></BookingModal>
            }
        </section>
    );
};

export default CarCategories;


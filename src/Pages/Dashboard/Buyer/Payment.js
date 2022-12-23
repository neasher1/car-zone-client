import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {

    const booking = useLoaderData();
    const { itemName, carModel, price } = booking;

    return (
        <div>
            <h3 className="text-3xl">Payment for {itemName} {carModel}</h3>
            <p className='text-xl my-4'>Please pay <strong>${price}</strong> for your {itemName} {carModel}</p>

            <div className='mx-6 mt-12 card shadow-2xl p-8 w-96'>
                {/* <Elements stripe={stripePromise}>
                    <CheckOutForm
                        booking={booking}
                    />
                </Elements> */}
            </div>
        </div>
    );
};

export default Payment;
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const CarCategory = ({ car, setBookCars }) => {

    const { name, image, location, model, originalPrice, postingDate, resalePrice, sellerName, uses } = car;
    const { user } = useContext(AuthContext);

    const { data: verifiedSeller = [], refetch } = useQuery({
        queryKey: ['verifiedSeller'],
        queryFn: async () => {
            const res = await fetch(`https://car-zone-server.vercel.app/verifiedseller?email=${user?.email}`)
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
                <img src={image} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className='font-bold'>Seller: {sellerName}</p>
                <p>Resale Price: ${resalePrice}</p>
                <p>Original Price: ${originalPrice}</p>
                <p>Model: {model}</p>
                <p>year Of Used: {uses}</p>
                <p>Location: {location}</p>
                <p>Posting Date: {postingDate}</p>
                <div className="card-actions justify-between">
                    {
                        user?.email ?
                            <label
                                onClick={() => setBookCars(car)}
                                htmlFor="booking-modal"
                                className="btn btn-primary text-white my-2"
                            >Book Now</label>
                            :
                            <Link to='/login' className='btn btn-primary text-white'>Login to Book</Link>
                    }
                    {
                        verifiedSeller
                            ?
                            <button className='btn btn-primary text-primary' disabled>Seller: Verified</button>
                            :
                            <button className='btn btn-error' disabled>Seller: Unverified</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default CarCategory;
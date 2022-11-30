import React from 'react';

const AdvertiseCard = ({ product }) => {
    const { image, location, resalePrice, model, name, originalPrice, postingDate, sellerName, uses } = product;
    return (
        <div className="card shadow-xl mt-12">
            <figure>
                <img src={image} alt="car!" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Model: {model}</p>
                <p>Original Price: ${originalPrice}</p>
                <p>Resale Price: ${resalePrice}</p>
                <p>Location: {location}</p>
                <p>Used of years: {uses}</p>
                <p>Posting Date: {postingDate}</p>
                <p className='font-bold'>Seller Name: {sellerName}</p>
            </div>
        </div>
    );
};

export default AdvertiseCard;
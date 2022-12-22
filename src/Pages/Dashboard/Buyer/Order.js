import React from 'react';

const Order = ({ order }) => {

    const { image, itemName, price, carModel, meetLocation } = order;
    // console.log(order);

    return (
        <div className="card shadow-xl">
            <figure>
                <img src={image} alt="car" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{itemName}</h2>
                <p>Model: {carModel}</p>
                <p>Location: {meetLocation}</p>
                <p className='font-bold text-primary'>Price: ${price}</p>
                <div className="card-actions">
                    <button className="btn btn-primary text-white mt-2">Pay Now</button>
                </div>
            </div>
        </div>
    );
};

export default Order;
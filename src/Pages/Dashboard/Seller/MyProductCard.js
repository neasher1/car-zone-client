import React from 'react';
import { Link } from 'react-router-dom';

const MyProductCard = ({ myProduct, deleteProduct }) => {
    const { image, name, model, postingDate, originalPrice, resalePrice, _id } = myProduct;
    return (
        <div className="card shadow-xl mt-4">
            <figure>
                <img src={image} alt="car!" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Model: {model}</p>
                <p>Original Price: ${originalPrice}</p>
                <p>Resale Price: ${resalePrice}</p>
                <p>Date: {postingDate}</p>
                <div className="card-actions justify-between">
                    <button className="btn btn-error">
                        <Link onClick={() => deleteProduct(_id)} className='text-white'>Delete</Link>
                    </button>
                    <button className="btn btn-primary">
                        <Link className='text-white'>Unsold</Link>
                    </button>
                </div>
                <button className="btn btn-primary w-full">
                    <Link className='text-white'>Advertise Car</Link>
                </button>
            </div>
        </div>
    );
};

export default MyProductCard;
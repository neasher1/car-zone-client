import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { category: category_name, name, img } = category;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img src={img} alt="car!" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary">
                        <Link className='text-white' to={`/category/${category_name}`}>Browse Car</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Category;
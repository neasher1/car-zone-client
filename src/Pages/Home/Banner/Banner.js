import React from 'react';
import bgBanner from '../../../Asstes/images/banner-bg.jpg';

const Banner = () => {
    return (
        <div className="hero py-24 bg-gradient-to-r from-accent to-primary text-white">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img className='w-full' src={bgBanner} alt="" />
                <div>
                    <h1 className="text-6xl font-bold">Find your next car with us</h1>
                    <p className="py-6 text-2xl font-semibold">Leading online automotive marketplace in Bangladesh</p>
                    <button className="btn btn-primary text-white">View Cars</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
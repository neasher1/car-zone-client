import React from 'react';
import img from '../../../src/Asstes/images/dashboard.jpg';

const Dashboard = () => {
    return (
        <div className='lg:my-16 lg:mx-32'>
            <h2 className='text-4xl font-bold text-primary text-center my-4'>Welcome to My Dashboard</h2>
            <figure>
                <img className='lg:w-2/4' src={img} alt="dashboard" />
            </figure>
        </div>
    );
};

export default Dashboard;
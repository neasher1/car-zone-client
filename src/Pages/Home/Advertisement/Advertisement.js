import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdvertiseCard from './AdvertiseCard';

const Advertisement = () => {

    const [advertiseProduct, setAdvertiseProduct] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/advertise')
            .then(data => {
                setAdvertiseProduct(data.data)
            })
    }, []);


    return (
        <div className='my-16 max-w-[1440px] mx-auto'>
            {
                advertiseProduct.length > 2 && <h3 className="text-3xl text-center text-primary font-bold">Advertisement Cars</h3>
            }
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
                {
                    advertiseProduct.length > 2 &&
                    advertiseProduct.map(product => {
                        return product.paid ? <></> : <AdvertiseCard
                            product={product}
                            key={product._id}
                        ></AdvertiseCard>
                    })
                }
            </div>

        </div>
    );
};

export default Advertisement;
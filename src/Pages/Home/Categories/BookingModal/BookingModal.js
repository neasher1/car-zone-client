import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const BookingModal = ({ bookCars, setBookCars }) => {
    const { user } = useContext(AuthContext);
    const { name, image, model, resalePrice } = bookCars;
    const navigate = useNavigate();
    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;

        const userName = user?.displayName;
        const email = user?.email;
        const itemName = form.itemName.value;
        const carModel = form.model.value;
        const price = form.resalePrice.value;
        const phn = form.phn.value;
        const meetLocation = form.meetLocation.value;

        const booking = {
            userName,
            email,
            itemName,
            carModel,
            price,
            phn,
            meetLocation,
            image
        }

        fetch('https://car-zone-server.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setBookCars(null);
                    toast.success("Booking Confirmed");
                    navigate('/dashboard/my-orders');
                }
            })


    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold text-primary">Book Now</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 my-4'>

                        <input type="name" name='name' defaultValue={user?.displayName} readOnly className="input input-bordered w-full" />

                        <input type="email" name='email' defaultValue={user?.email} readOnly className="input input-bordered w-full" />

                        <input type="text" name='itemName' defaultValue={name} readOnly className="input input-bordered w-full" />

                        <input type="text" name='model' defaultValue={model} readOnly className="input input-bordered w-full" />

                        <input type="text" name='resalePrice' defaultValue={resalePrice} readOnly className="input input-bordered w-full" />

                        <input type="text" name='phn' placeholder='Your Phn Number:' className="input input-bordered w-full" required />

                        <input type="text" name='meetLocation' placeholder='Meeting Location' className="input input-bordered w-full" required />

                        <input type="submit" className="btn btn-accent text-white" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const AddProducts = () => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const navigation = useNavigate();

    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgbbHostKey = process.env.REACT_APP_imgbb_key;

    const handleAddProduct = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {

                    const addProduct = {
                        sellerName: user?.displayName,
                        email: user?.email,
                        image: imgData.data.url,
                        name: data.carName,
                        model: data.model,
                        originalPrice: data.originalPrice,
                        resalePrice: data.resalePrice,
                        uses: data.uses,
                        location: data.location,
                        postingDate: `${date}.${month}.${year}`,
                        category: data.category,
                        phn: data.phn
                    }

                    fetch('https://car-zone-server.vercel.app/uploadCar', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(addProduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success('Product Uploaded Successfully');
                            navigation('/dashboard/my-products');
                        })

                }
            })
    }


    return (
        <div>
            <h2 className="text-3xl font-bold text-primary">Add a Product</h2>
            <div className='my-6 flex justify-center items-center'>
                <div className='card shadow-2xl p-8'>
                    <form onSubmit={handleSubmit(handleAddProduct)}>
                        <div className='grid grid-cols-2 gap-6'>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    {...register("name")}
                                    type="text" className="input input-bordered w-full max-w-xs" defaultValue={user?.displayName} readOnly />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    {...register("email")}
                                    type="email" className="input input-bordered w-full max-w-xs" defaultValue={user?.email} readOnly />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    {...register("carName", {
                                        required: "Please provided product Car Name",
                                    })}
                                    type="text" className="input input-bordered w-full max-w-xs" placeholder='Car Name' />
                                {errors.carName && <span className='text-error'>{errors.carName.message}</span>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    {...register("model", {
                                        required: "Please provided product Car Model",
                                    })}
                                    type="text" className="input input-bordered w-full max-w-xs" placeholder='Car Model' />
                                {errors.model && <span className='text-error'>{errors.model.message}</span>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    {...register("originalPrice", {
                                        required: "Please provided product original Price",
                                    })}
                                    type="text" className="input input-bordered w-full max-w-xs" placeholder='Original Price' />
                                {errors.originalPrice && <span className='text-error'>{errors.originalPrice.message}</span>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    {...register("resalePrice", {
                                        required: "Please provided product resale Price",
                                    })}
                                    type="text" className="input input-bordered w-full max-w-xs" placeholder='Resale Price' />
                                {errors.resalePrice && <span className='text-error'>{errors.resalePrice.message}</span>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    {...register("uses", {
                                        required: "Please provided product uses of years",
                                    })}
                                    type="text" className="input input-bordered w-full max-w-xs" placeholder='Uses of Years' />
                                {errors.uses && <span className='text-error'>{errors.uses.message}</span>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    {...register("location", {
                                        required: "Please provided product location",
                                    })}
                                    type="text" className="input input-bordered w-full max-w-xs" placeholder='location' />
                                {errors.location && <span className='text-error'>{errors.location.message}</span>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    {...register("postingDate", {
                                        required: "Please provided product posting Date",
                                    })}
                                    type="text" className="input input-bordered w-full max-w-xs" placeholder='posting Date: date/month/year' />
                                {errors.postingDate && <span className='text-error'>{errors.postingDate.message}</span>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <div className='input-group'>
                                    <select required {...register("category")} className="select select-bordered">
                                        <option value="bmw">bmw</option>
                                        <option value="volvo">volvo</option>
                                        <option value="mercedes">mercedes</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    {...register("phn", {
                                        required: "Please provided phn number",
                                    })}
                                    type="text" className="input input-bordered w-full max-w-xs" placeholder='Mobile Number' />
                                {errors.phn && <span className='text-error'>{errors.phn.message}</span>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    {...register("image", {
                                        required: "Image is required"
                                    })}
                                    type="file" className="input input-bordered w-full max-w-xs" placeholder='Upload a Image' />
                                {errors.img && <span className='text-error'>{errors.img.message}</span>}
                            </div>
                        </div>

                        <input className='btn btn-accent w-full text-white mt-6 text-center' type="submit" value="Add Product" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;
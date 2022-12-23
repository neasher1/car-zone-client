import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const googleProvider = new GoogleAuthProvider();

const Register = () => {
    const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handleSignUp = (data, event) => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                toast.success("Successfully User Created");
                event.target.reset();

                const userInfo = {
                    displayName: data.name,
                }

                updateUser(userInfo)
                    .then(() => {
                        savedUsertoDb(data.name, data.email, data.account);
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
                // navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            });
    }

    const savedUsertoDb = (name, email, account) => {
        const user = {
            name,
            email,
            role: account
        }

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    fetch(`http://localhost:5000/jwt?email=${email}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.accessToken) {
                                localStorage.setItem('accessToken', data.accessToken);
                            }
                        })
                    navigate('/');
                }
            })

    }

    // const handleSignInGoogle = () => {
    //     signInWithGoogle(googleProvider)
    //         .then(result => {
    //             const user = result.user;
    //             toast.success("successfully logged in");
    //             navigate('/');
    //         })
    //         .catch(error => {
    //             toast.error(error.message);
    //         })
    // }

    const handleSignInGoogle = () => {
        signInWithGoogle(googleProvider)
            .then(res => {
                fetch(`http://localhost:5000/jwt?email=${res.user.email}`)
                    .then(res => res.json())
                    .then(token => {
                        localStorage.setItem('accessToken', token.accessToken);
                        const user = {
                            name: res.user.displayName,
                            email: res.user.email,
                            role: 'buyer',
                        };
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(user)
                        })
                            .then(res => res.json())
                            .then(data => {
                                toast.success('Register successfully')
                                navigate('/dashboard')

                            })
                    });


            })
            .catch(err => toast.error(err))
    }

    return (
        <div className='h-[500px] flex justify-center items-center my-32'>
            <div className='w-96 card shadow-2xl p-8'>
                <h2 className="text-4xl font-bold text-accent mb-4 text-center">Register</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input
                            {...register("name", {
                                required: "Please provided your name",
                            })}
                            type="text" className="input input-bordered w-full max-w-xs" />
                        {errors.name && <span className='text-error'>{errors.name.message}</span>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            {...register("email", {
                                required: "email address is required"
                            })}
                            type="email" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <span className='text-error'>{errors.email.message}</span>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            {...register("password", {
                                required: "password is required",
                                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/, message: "Password should be minimum six characters, at least one uppercase, one lowercase and one number" },
                                minLength: { value: 6, message: "password should be at least 6 characters or long" },
                            })}
                            type="password" className="input input-bordered w-full max-w-xs" />
                        {errors.password && <span className='text-error'>{errors.password.message}</span>}
                    </div>

                    <div className="form-control w-full max-w-xs my-4">
                        <div className="input-group">
                            <select {...register("account")} className="select select-bordered">
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                    </div>

                    <input className='btn btn-accent w-full text-white my-4' type="submit" value="Register" />
                </form>
                <span className='text-sm my-2 text-center'>Already have an account? <Link to="/login" className='text-primary'>Please Login</Link> </span>
                <div className="divider">OR</div>
                <button onClick={handleSignInGoogle} className='uppercase btn btn-outline text-sm'>Continue With Google</button>
            </div>
        </div>
    );
};

export default Register;
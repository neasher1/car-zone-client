import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (data, event) => {
        signInUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast.success("Successfully logged in");
                event.target.reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);
            })
    }


    const handleSignInGoogle = () => {
        signInWithGoogle(googleProvider)
            .then(result => {
                const user = result.user;
                toast.success("successfully logged in");
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className='h-[500px] flex justify-center items-center my-16'>
            <div className='w-96 card shadow-2xl p-8'>
                <h2 className="text-4xl font-bold text-accent mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            {...register("email", {
                                required: "email address is required",
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className="text-error">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            {...register("password", {
                                required: "password is required",
                                minLength: { value: 6, message: "password must be 6 characters or longer" }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className="text-error">{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text-alt">Forget Password?</span>
                        </label>
                    </div>
                    <input className='btn btn-accent w-full text-white my-2' type="submit" value="Login" />
                </form>
                <span className='text-sm my-2 text-center'>New to Doctor's Portal? <Link to="/register" className='text-primary'>Create new account</Link> </span>
                <div className="divider">OR</div>
                <button onClick={handleSignInGoogle} className='uppercase btn btn-outline text-sm'>Continue With Google</button>
            </div>
        </div>
    );
};

export default Login;
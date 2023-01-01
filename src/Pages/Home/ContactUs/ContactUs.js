import { send } from 'emailjs-com';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import bg from '../../../Asstes/images/slide3.jpg';

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleContact = (data, event) => {
        const userInfo = {
            message: data.message,
            reply_to: data.reply_to,
            subject: data.subject
        }
        send(
            process.env.REACT_APP_serviceIdEmailJs,
            process.env.REACT_APP_templateIdEmailJs,
            userInfo,
            process.env.REACT_APP_publicKeyEmailJs,
        )
            .then(res => {
                console.log("Success", res.status, res.text);
                toast.success("Submitted, Contact you soon..");
                event.target.reset();
            })
            .catch(error => console.log(error))

    }

    return (
        <section className='bg-no-repeat bg-cover bg-center rounded-lg py-4 mt-28 p-8' style={{ backgroundImage: `url(${bg})` }}>
            <div className='text-center my-4'>
                <h3 className="text-3xl text-white">Stay connected with us</h3>
            </div>
            <form onSubmit={handleSubmit(handleContact)} className="w-4/5 md:w-2/5 lg:w-1/4 mx-auto m-8">
                <div className="form-control">

                    <input
                        {...register("reply_to", {
                            required: "email address is required"
                        })}
                        type="text" placeholder="your email" className="input input-bordered" />
                    {errors.reply_to && <span className='text-error'>{errors.reply_to.message}</span>}

                    <input
                        {...register("subject", {
                            required: "subject is required"
                        })}
                        type="text" placeholder="subject" className="input input-bordered my-6" />
                    {errors.subject && <span className='text-error'>{errors.subject.message}</span>}

                    <textarea
                        {...register("message", {
                            required: "message is required"
                        })}
                        className="textarea textarea-bordered" placeholder="Message">
                    </textarea>
                    {errors.message && <span className='text-error'>{errors.message.message}</span>}

                </div>
                <div className="form-control mt-6">
                    <button className='btn btn-primary text-white'>Submit</button>
                </div>
            </form>
        </section>
    );
};

export default ContactUs;
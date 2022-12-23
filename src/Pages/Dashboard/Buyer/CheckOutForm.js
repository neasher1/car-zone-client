import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const CheckOutForm = ({ booking }) => {
    // console.log(booking);
    const { price, email, _id, userName } = booking;
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionid, setTransactionid] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            });
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setCardError('');
        }

        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userName,
                        email: email,
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {

            //save payment info in db
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id,
            }
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(payment),
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess("Congrats, payment successfully completed!");
                        setTransactionid(paymentIntent.id);
                        toast.success("Payment Successfully");
                    }
                })
        }
        setProcessing(false);

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='mt-6 btn btn-primary btn-sm'
                    type="submit"
                    disabled={!stripe || !clientSecret || setProcessing}>
                    Pay
                </button>
            </form>
            <p className="text-error mt-4">{cardError}</p>
            <p className="text-success mt-4">{success}</p>
            {
                transactionid &&
                <p className="font-bold mt-4">TransactionID: {transactionid}</p>
            }
        </>
    );
};

export default CheckOutForm;
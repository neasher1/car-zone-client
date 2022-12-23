import React from "react";
import { Link } from "react-router-dom";

const Order = ({ order }) => {
  const { image, itemName, price, carModel, meetLocation, _id } = order;
  console.log(order);

  return (
    <div className="card shadow-xl">
      <figure>
        <img src={image} alt="car" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{itemName}</h2>
        <p>Model: {carModel}</p>
        <p>Location: {meetLocation}</p>
        <p className="font-bold text-primary">Price: ${price}</p>

        <div className="card-actions">
          <Link to={`/dashboard/payment/${_id}`}>
            <button className="btn btn-primary text-white btn-sm">Pay</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Order;

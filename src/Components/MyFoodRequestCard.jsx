import React from 'react';

const MyFoodsRequestCard = ({ request }) => {
    const {
        foodImage,
        foodName,
        pickupLocation,
        expiredDateTime,
        requestDate,
        foodDonatorName,
    } = request;

    return (
        <div className="card bg-base-100 shadow-md rounded-3xl p-4 flex flex-col lg:flex-row items-center">
            <img
                src={foodImage || "https://via.placeholder.com/400x300?text=No+Image"}
                alt="Food"
                className="w-full lg:w-1/3 h-52 object-cover rounded-2xl"
            />

            <div className="flex-1 p-4">
                <h2 className="text-xl font-bold mb-2">{foodName}</h2>
                <p><span className="font-semibold">Donor Name:</span> {foodDonatorName}</p>
                <p><span className="font-semibold">Pickup Location:</span> {pickupLocation}</p>
                <p><span className="font-semibold">Expire Date:</span> {expiredDateTime}</p>
                <p><span className="font-semibold">Request Date:</span> {new Date(requestDate).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default MyFoodsRequestCard;

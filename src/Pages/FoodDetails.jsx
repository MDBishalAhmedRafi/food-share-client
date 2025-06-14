import React, { useState, use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useLoaderData } from 'react-router';


const FoodDetails = () => {
    const food = useLoaderData();
    const { user } = use(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            foodId: food._id,
            foodName: food.foodName,
            foodImage: food.foodImage,
            foodDonatorEmail: food.userEmail,
            foodDonatorName: food.userName,
            userEmail: user?.email,
            requestDate: new Date().toISOString(),
            pickupLocation: food.pickupLocation,
            expiredDateTime: food.expiredDateTime,
            additionalNotes: additionalNotes
        };

        try {
            const response = await fetch('http://localhost:3000/requestedFoods', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                alert('Request submitted successfully!');
                setIsModalOpen(false);
                window.location.reload(); // refresh the available food list
            } else {
                alert('Failed to submit request');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <div className="card lg:card-side bg-base-100 shadow-sm lg:p-4 md:p-3 p-2 lg:w-11/12 mx-auto mb-10">
            <figure className='lg:w-5/12'>
                <img className='rounded-3xl' src={food.foodImage} alt="Food" />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold">{food.foodName}</h2>
                <p className='font-bold'>Total Quantity: {food.foodQuantity}</p>
                <p className='font-bold'>Pickup Location: {food.pickupLocation}</p>
                <p className='font-bold'>Expire Date: {food.expiredDateTime}</p>
                <p className='font-bold'>Preparation Time: {food.additionalNotes}</p>
                <p className='font-bold'>Food Status: {food.foodStatus}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Request</button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center">
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 mx-3 overflow-y-auto max-h-[90vh]">
                        <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => setIsModalOpen(false)}>&times;</button>

                        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Request Food</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label className="font-medium">Food Name</label>
                                <input className="input input-bordered w-full bg-gray-100" value={food.foodName} disabled />
                            </div>

                            <div><label className="font-medium">Food Image</label>
                                <input className="input input-bordered w-full bg-gray-100" value={food.foodImage} disabled />
                            </div>

                            <div><label className="font-medium">Donator Name</label>
                                <input className="input input-bordered w-full bg-gray-100" value={food.userName} disabled />
                            </div>

                            <div><label className="font-medium">Donator Email</label>
                                <input className="input input-bordered w-full bg-gray-100" value={food.userEmail} disabled />
                            </div>

                            <div><label className="font-medium">Your Email</label>
                                <input className="input input-bordered w-full bg-gray-100" value={user?.email} disabled />
                            </div>

                            <div><label className="font-medium">Request Date</label>
                                <input className="input input-bordered w-full bg-gray-100" value={new Date().toLocaleString()} disabled />
                            </div>

                            <div><label className="font-medium">Pickup Location</label>
                                <input className="input input-bordered w-full bg-gray-100" value={food.pickupLocation} disabled />
                            </div>

                            <div><label className="font-medium">Expire Date</label>
                                <input className="input input-bordered w-full bg-gray-100" value={food.expiredDateTime} disabled />
                            </div>

                            <div><label className="font-medium">Additional Notes</label>
                                <textarea className="textarea textarea-bordered w-full" placeholder="Write any notes..." value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
                            </div>

                            <button type="submit" className="btn btn-primary w-full text-lg">Submit Request</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetails;

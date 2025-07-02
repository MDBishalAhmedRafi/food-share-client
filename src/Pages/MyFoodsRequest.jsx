import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const MyFoodsRequest = () => {
    const { user } = useContext(AuthContext);
    const [myRequests, setMyRequests] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://food-sharing-server-coral.vercel.app/my-requests?email=${user.email}`, { 
                headers: { "authorization": `Bearer ${user.accessToken}` }
            })
                .then(res => res.json())
                .then(data => setMyRequests(data));
        }
    }, [user?.email, user.accessToken]);

    return (
        <div className="lg:w-11/12 lg:mx-auto mx-2 lg:mt-21 md:mt-21 mt-21 bg-gradient-to-br from-indigo-50 via-white to-emerald-200 rounded-2xl py-10 px-4">
            <h2 className="text-center text-3xl font-extrabold mb-8 text-indigo-600">My Food Requests</h2>

            {myRequests.length === 0 ? (
                <p className="text-center text-lg text-gray-500">You have not requested any foods yet.</p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-xl border">
                    <table className="table w-full text-center">
                        <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg">
                            <tr>
                                <th>Donar Name</th>
                                <th>Food Name</th>
                                <th>Pickup Location</th>
                                <th>Expire Date</th>
                                <th>Request Date & Time</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white dark:bg-gray-700'>
                            {myRequests.map(request => (
                                <tr key={request._id}>
                                    <td className='text-gray-700 dark:text-gray-200 font-bold border-2 border-black'>{request.foodDonatorName}</td>
                                    <td className='text-gray-700 dark:text-gray-200 font-bold border-2 border-black'>{request.foodName}</td>
                                    <td className='text-gray-700 dark:text-gray-200 font-bold border-2 border-black'>{request.pickupLocation}</td>
                                    <td className='text-gray-700 dark:text-gray-200 font-bold border-2 border-black'>{request.expiredDateTime}</td>
                                    <td className='text-gray-700 dark:text-gray-200 font-bold border-2 border-black'>{new Date(request.requestDate).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyFoodsRequest;

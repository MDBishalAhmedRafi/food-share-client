import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const MyFoodsRequest = () => {
    const { user } = useContext(AuthContext);
    const [myRequests, setMyRequests] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/my-requests?email=${user.email}`)
                .then(res => res.json())
                .then(data => setMyRequests(data));
        }
    }, [user?.email]);

    return (
        <div className="lg:w-11/12 mx-auto my-10">
            <h2 className="text-center text-3xl font-bold mb-8 text-indigo-600">My Food Requests</h2>

            {myRequests.length === 0 ? (
                <p className="text-center text-lg text-gray-500">You have not requested any foods yet.</p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-xl border">
                    <table className="table w-full text-center">
                        <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg">
                            <tr>
                                <th>Donar Name</th>
                                <th>Pickup Location</th>
                                <th>Expire Date</th>
                                <th>Request Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myRequests.map(request => (
                                <tr key={request._id}>
                                    <td>{request.foodDonatorName}</td>
                                    <td>{request.pickupLocation}</td>
                                    <td>{request.expiredDateTime}</td>
                                    <td>{new Date(request.requestDate).toLocaleString()}</td>
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

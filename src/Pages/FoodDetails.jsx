// import React, { useState, use } from 'react';
// import { AuthContext } from '../Provider/AuthProvider';
// import { useLoaderData } from 'react-router';
// import Swal from 'sweetalert2';


// const FoodDetails = () => {
//     const food = useLoaderData();
//     const { user } = use(AuthContext);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [additionalNotes, setAdditionalNotes] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const requestData = {
//             foodId: food._id,
//             foodName: food.foodName,
//             foodImage: food.foodImage,
//             foodDonatorEmail: food.userEmail,
//             foodDonatorName: food.userName,
//             userEmail: user?.email,
//             requestDate: new Date().toISOString(),
//             pickupLocation: food.pickupLocation,
//             expiredDateTime: food.expiredDateTime,
//             additionalNotes: additionalNotes
//         };

//         try {
//             const response = await fetch('https://food-sharing-server-coral.vercel.app/requestedFoods', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(requestData)
//             });

//             if (response.ok) {
//                 // alert('Request submitted successfully!');
//                  Swal.fire({
//                           position: "top-end",
//                           icon: "success",
//                           title: "Request submitted successfully!",
//                           showConfirmButton: false,
//                           timer: 1500
//                         });
//                 setIsModalOpen(false);
//                 // window.location.reload(); // refresh the available food list
//             } else {
//                 alert('Failed to submit request');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred');
//         }
//     };

//     return (
//         <div className="card lg:card-side bg-base-100 shadow-sm lg:p-4 md:p-3 p-2 lg:w-11/12 mx-auto mb-10">
//             <figure className='lg:w-5/12'>
//                 <img className='rounded-3xl' src={food.foodImage} alt="Food" />
//             </figure>
//             <div className="card-body">
//                 <h2 className="card-title font-bold">{food.foodName}</h2>
//                 <p className='font-bold'>Total Quantity: {food.foodQuantity}</p>
//                 <p className='font-bold'>Pickup Location: {food.pickupLocation}</p>
//                 <p className='font-bold'>Expire Date: {food.expiredDateTime}</p>
//                 <p className='font-bold'>Preparation Time: {food.additionalNotes}</p>
//                 <p className='font-bold'>Food Status: {food.foodStatus}</p>
//                 <div className="card-actions justify-end">
//                     <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Request</button>
//                 </div>
//             </div>

//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center">
//                     <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 mx-3 overflow-y-auto max-h-[90vh]">
//                         <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => setIsModalOpen(false)}>&times;</button>

//                         <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Request Food</h2>

//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div><label className="font-medium">Food Name</label>
//                                 <input className="input input-bordered w-full bg-gray-100" value={food.foodName} disabled />
//                             </div>

//                             <div><label className="font-medium">Food Image</label>
//                                 <input className="input input-bordered w-full bg-gray-100" value={food.foodImage} disabled />
//                             </div>

//                             <div><label className="font-medium">Donator Name</label>
//                                 <input className="input input-bordered w-full bg-gray-100" value={food.userName} disabled />
//                             </div>

//                             <div><label className="font-medium">Donator Email</label>
//                                 <input className="input input-bordered w-full bg-gray-100" value={food.userEmail} disabled />
//                             </div>

//                             <div><label className="font-medium">Your Email</label>
//                                 <input className="input input-bordered w-full bg-gray-100" value={user?.email} disabled />
//                             </div>

//                             <div><label className="font-medium">Request Date</label>
//                                 <input className="input input-bordered w-full bg-gray-100" value={new Date().toLocaleString()} disabled />
//                             </div>

//                             <div><label className="font-medium">Pickup Location</label>
//                                 <input className="input input-bordered w-full bg-gray-100" value={food.pickupLocation} disabled />
//                             </div>

//                             <div><label className="font-medium">Expire Date</label>
//                                 <input className="input input-bordered w-full bg-gray-100" value={food.expiredDateTime} disabled />
//                             </div>

//                             <div><label className="font-medium">Additional Notes</label>
//                                 <textarea className="textarea textarea-bordered w-full" placeholder="Write any notes..." value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
//                             </div>

//                             <button type="submit" className="btn btn-primary w-full text-lg">Submit Request</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FoodDetails;



import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from './Loading';
import { toast } from 'react-toastify';

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [hasRequested, setHasRequested] = useState(false);

  // 🟢 Fetch food details
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(`https://food-sharing-server-coral.vercel.app/foods/${id}`, { 
            headers: { "authorization": `Bearer ${user.accessToken}` }
        });
        const data = await res.json();
        setFood(data);
      } catch (err) {
        console.error('Failed to load food:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id, user.accessToken]);

  if (loading || !user || !food) return <Loading />;

  const handleRequest = () => {
    if (user.email === food.userEmail) {
      toast.warn("You can't request your own added food.");
      return;
    }
    if (hasRequested) {
      toast.warn("You have already requested this food.");
      return;
    }
    setIsModalOpen(true);
  };

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
      const response = await fetch('https://food-sharing-server-coral.vercel.app/requestedFoods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Request submitted successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        setIsModalOpen(false);
        setHasRequested(true);
      } else {
        alert('Failed to submit request');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="card lg:card-side lg:mt-21 md:mt-21 mt-21 bg-white  shadow-sm lg:p-4 md:p-3 p-2 lg:w-11/12 mx-auto mb-10">
      <figure className='lg:w-5/12'>
        <img className='rounded-3xl' src={food.foodImage} alt="Food" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold text-indigo-800 dark:text-white">{food.foodName}</h2>
        <p className='text-indigo-800  font-bold'>Total Quantity: {food.foodQuantity}</p>
        <p className='font-extrabold text-indigo-800 '>Pickup Location: {food.pickupLocation}</p>
        <p className='font-extrabold text-indigo-800 '>Expire Date: {food.expiredDateTime}</p>
        <p className='font-extrabold text-indigo-800 '>Preparation Time: {food.additionalNotes}</p>
        <p className='font-extrabold text-indigo-800 '>Food Status: {food.foodStatus}</p>
        <div className="card-actions justify-end">
          <button onClick={handleRequest} className="btn btn-success">
            {hasRequested ? "Requested" : "Request"}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 mx-3 overflow-y-auto max-h-[90vh]">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => setIsModalOpen(false)}>&times;</button>
            <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Request Food</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="font-bold text-gray-800">Food Name</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={food.foodName} disabled />
              </div>
              <div><label className="font-bold text-gray-800">Food Image</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={food.foodImage} disabled />
              </div>
              <div><label className="font-bold text-gray-800">Donator Name</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={food.userName} disabled />
              </div>
              <div><label className="font-bold text-gray-800">Donator Email</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={food.userEmail} disabled />
              </div>
              <div><label className="font-bold text-gray-800">Your Email</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={user?.email} disabled />
              </div>
              <div><label className="font-bold text-gray-800">Request Date</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={new Date().toLocaleString()} disabled />
              </div>
              <div><label className="font-bold text-gray-800">Pickup Location</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={food.pickupLocation} disabled />
              </div>
              <div><label className="font-bold text-gray-800">Expire Date</label>
                <input className="input input-bordered w-full bg-gray-100" value={food.expiredDateTime} disabled />
              </div>
              <div><label className="font-bold text-gray-800">Additional Notes</label>
                <textarea className="textarea textarea-bordered w-full bg-gray-400 text-gray-700 font-medium" placeholder="Write any notes..." value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
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






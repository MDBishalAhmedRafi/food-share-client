import React, { use, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import ManageMyFoodCard from "../Components/ManageMyFoodCard";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';

const ManageMyFoods = () => {
  const addedFoods = useLoaderData();
  const [foods, setFoods] = useState(addedFoods);
  const { user } = use(AuthContext);
  const [selectedFood, setSelectedFood] = useState(null);  // <-- for update modal

  // Delete Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://food-sharing-server-coral.vercel.app/my-foods/${id}`, {
          headers: { "authorization": `Bearer ${user.accessToken}` },
          method: "DELETE",
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              setFoods(prevFoods => prevFoods.filter(food => food._id !== id));
              Swal.fire('Deleted!', 'The food item has been deleted.', 'success');
            }
          });
      }
    });
  };

  // Open update modal
  const handleUpdate = (food) => {
    setSelectedFood({ ...food });
  };

  // Save updated food
  const handleSaveUpdate = () => {
    fetch(`https://food-sharing-server-coral.vercel.app/my-foods/${selectedFood._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "authorization": `Bearer ${user.accessToken}` },
      body: JSON.stringify(selectedFood),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          const updatedFoods = foods.map(food =>
            food._id === selectedFood._id ? selectedFood : food
          );
          setFoods(updatedFoods);
          setSelectedFood(null);
          Swal.fire('Updated!', 'The food item has been updated.', 'success');
        }
      });
  };

  useEffect(() => {
  if (user?.email) {
    fetch(`https://food-sharing-server-coral.vercel.app/my-foods/${user.email}`, { 
       headers: { "authorization": `Bearer ${user.accessToken}` }
    })
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }
}, [user?.email, user?.accessToken]);


 

  return (
    <motion.div
      className="min-h-screen lg:mt-21 md:mt-21 mt-21 lg:w-11/12 lg:mx-auto mx-2 bg-gradient-to-br from-indigo-50 via-white to-emerald-200 rounded-2xl py-10 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-600 mb-10">
          Manage My Foods
        </h2>

        <motion.div
          className="overflow-x-auto shadow-2xl rounded-2xl bg-white"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
        >
          <table className="min-w-full border-collapse">
            <thead className="bg-gradient-to-r from-indigo-500 to-emerald-500 text-white text-sm md:text-base">
              <tr>
                <th className="py-4 px-4 text-left">#</th>
                <th className="py-4 px-4 text-left">Donor Image</th>
                <th className="py-4 px-4 text-left">Donor Name & Email</th>
                <th className="py-4 px-4 text-left">Pickup Location</th>
                <th className="py-4 px-4 text-left">Expire Date</th>
                <th className="py-4 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {foods?.map((food, index) => (
                <ManageMyFoodCard key={food._id} food={food} index={index + 1} handleDelete={handleDelete} handleUpdate={handleUpdate} />
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Update Modal */}
      {selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 mx-3 overflow-y-auto max-h-[90vh]">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={() => setSelectedFood(null)}>&times;</button>
            <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Update Food</h2>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveUpdate(); }} className="space-y-4">
              <div><label className="font-bold text-gray-800">Food Name</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={selectedFood.foodName} onChange={(e) => setSelectedFood({ ...selectedFood, foodName: e.target.value })} />
              </div>
              <div><label className="font-bold text-gray-800">Food Image URL</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={selectedFood.foodImage} onChange={(e) => setSelectedFood({ ...selectedFood, foodImage: e.target.value })} />
              </div>
              <div><label className="font-bold text-gray-800">Food Quantity</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={selectedFood.foodQuantity} onChange={(e) => setSelectedFood({ ...selectedFood, foodQuantity: e.target.value })} />
              </div>
              <div><label className="font-bold text-gray-800">Pickup Location</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={selectedFood.pickupLocation} onChange={(e) => setSelectedFood({ ...selectedFood, pickupLocation: e.target.value })} />
              </div>
              <div><label className="font-bold text-gray-800">Expired Date</label>
                <input className="input input-bordered w-full bg-gray-400 text-gray-700 font-medium" value={selectedFood.expiredDateTime} onChange={(e) => setSelectedFood({ ...selectedFood, expiredDateTime: e.target.value })} />
              </div>
              <div><label className="font-bold text-gray-800">Additional Notes</label>
                <textarea className="textarea textarea-bordered bg-gray-400 text-gray-700 font-medium w-full" value={selectedFood.additionalNotes} onChange={(e) => setSelectedFood({ ...selectedFood, additionalNotes: e.target.value })}></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedFood(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManageMyFoods;

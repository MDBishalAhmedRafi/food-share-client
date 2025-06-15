import React, { use, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import ManageMyFoodCard from "../Components/ManageMyFoodCard";
import { motion } from "framer-motion";
import Swal from 'sweetalert2'; // For sweet alert notification

const ManageMyFoods = () => {
  const addedFoods = useLoaderData();
  const [foods, setFoods] = useState(addedFoods);
  const { user } = use(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/my-foods/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
      });
  }, [user]);

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
        fetch(`http://localhost:3000/my-foods/${id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              // Update UI without reloading
              setFoods(prevFoods => prevFoods.filter(food => food._id !== id));

              Swal.fire(
                'Deleted!',
                'The food item has been deleted.',
                'success'
              );
            }
          });
      }
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-10 px-4"
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
              {foods.map((food, index) => (
                <ManageMyFoodCard key={food._id} food={food} index={index + 1} handleDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ManageMyFoods;

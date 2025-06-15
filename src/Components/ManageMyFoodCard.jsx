import React from "react";
import { motion } from "framer-motion";

const ManageMyFoodCard = ({ food, index, handleDelete, handleUpdate }) => {
  return (
    <motion.tr
      className="hover:bg-gray-50 transition"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: index * 0.07,
      }}
    >
      <td className="py-4 px-4 font-semibold text-gray-600">{index}</td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg">
            <img
              src={food.userImage}
              alt="Donor Avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="font-bold text-gray-800">{food.userName}</div>
        <div className="text-sm text-gray-500">{food.userEmail}</div>
      </td>
      <td className="py-4 px-4">
        <span className="text-indigo-600 font-medium">
          {food.pickupLocation}
        </span>
      </td>

      <td className="py-4 px-4">
        <span className="text-emerald-500 font-semibold">
          {food.expiredDateTime}
        </span>
      </td>

      <td className="py-4 px-4 flex flex-col md:flex-row gap-3">
        <button
          onClick={() => handleUpdate(food)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-xl shadow hover:bg-indigo-600 transition text-sm font-medium"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(food._id)}
          className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition text-sm font-medium"
        >
          Delete
        </button>
      </td>
    </motion.tr>
  );
};

export default ManageMyFoodCard;

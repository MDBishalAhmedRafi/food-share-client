import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { format } from 'date-fns';

const AddFood = () => {
  const [formData, setFormData] = useState({
    foodName: '',
    foodImageUrl: '',
    foodQuantity: '',
    pickupLocation: '',
    expiredDateTime: null,
    additionalNotes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, expiredDateTime: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User not logged in!',
      });
      return;
    }

    // Format date as DD-MM-YYYY
    const formattedDate = format(formData.expiredDateTime, 'dd-MM-yyyy');

    const foodData = {
      ...formData,
      expiredDateTime: formattedDate,
      foodStatus: 'available',
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL
    };

    try {
      const response = await axios.post('http://localhost:3000/available-foods', foodData);
      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Food has been added",
          showConfirmButton: false,
          timer: 1500
        });

        setFormData({
          foodName: '',
          foodImageUrl: '',
          foodQuantity: '',
          pickupLocation: '',
          expiredDateTime: null,
          additionalNotes: ''
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Something went wrong.',
      });
    }
  };

  return (
    <div className="min-h-screen lg:w-11/12 lg:mx-auto mx-2 bg-gradient-to-r from-[#F1FAEE] via-orange to-[#2A9D8F] rounded-2xl flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">🍽️ Add New Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Food Name */}
          <div>
            <label className="block text-lg font-bold text-gray-700  mb-2">Food Name</label>
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              placeholder="Enter food name"
              required
              className="w-full p-3 border border-gray-300 text-gray-700 font-medium rounded-xl"
            />
          </div>

          {/* Food Image URL */}
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-2">Food Image URL</label>
            <input
              type="text"
              name="foodImageUrl"
              value={formData.foodImageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full p-3 border border-gray-300 text-gray-700 font-medium rounded-xl"
            />
          </div>

          {/* Food Quantity */}
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-2">Food Quantity</label>
            <input
              type="text"
              name="foodQuantity"
              value={formData.foodQuantity}
              onChange={handleChange}
              placeholder="e.g. 5 plates, 3 kg"
              required
              className="w-full p-3 border border-gray-300 text-gray-700 font-medium rounded-xl"
            />
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-2">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="e.g. Downtown, City Center"
              required
              className="w-full p-3 border border-gray-300 text-gray-700 font-medium rounded-xl"
            />
          </div>

          {/* Expired Date */}
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-2">Expired Date</label>
            <DatePicker
              selected={formData.expiredDateTime}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              minDate={new Date()}
              placeholderText="Select expiration date"
              required
              className="w-full p-3 border border-gray-300 text-gray-700 font-medium rounded-xl"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-lg font-bold text-gray-700 mb-2">Additional Notes</label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any special instructions..."
              className="w-full p-3 border border-gray-300 text-gray-700 font-medium rounded-xl"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#2A9D8F90] hover:bg-[#2A9D8F] text-black hover:text-white cursor-pointer font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transform transition"
            >
              Add Food
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddFood;

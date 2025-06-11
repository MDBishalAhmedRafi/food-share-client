import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
   Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your Food has been added",
  showConfirmButton: false,
  timer: 1500
});
  };

  return (
    <div className="min-h-screen lg:w-11/12 lg:mx-auto mx-2 rounded-2xl bg-gradient-to-tr from-blue-100 to-purple-200 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">🍽️ Add New Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Food Name */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Food Name</label>
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 ${
                formData.foodName ? 'text-blue-900 font-semibold' : ''
              }`}
              placeholder="Enter food name"
              required
            />
          </div>

          {/* Food Image URL */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Food Image URL</label>
            <input
              type="text"
              name="foodImageUrl"
              value={formData.foodImageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 ${
                formData.foodImageUrl ? 'text-blue-900 font-semibold' : ''
              }`}
              required
            />
          </div>

          {/* Food Quantity */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Food Quantity</label>
            <input
              type="number"
              name="foodQuantity"
              value={formData.foodQuantity}
              onChange={handleChange}
              placeholder="e.g. 5 plates, 3 kg"
              className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 ${
                formData.foodQuantity ? 'text-blue-900 font-semibold' : ''
              }`}
              required
            />
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="e.g. Downtown, City Center"
              className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 ${
                formData.pickupLocation ? 'text-blue-900 font-semibold' : ''
              }`}
              required
            />
          </div>

          {/* Expired Date (Date only) */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Expired Date</label>
            <DatePicker
              selected={formData.expiredDateTime}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              minDate={new Date()}
              className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 ${
                formData.expiredDateTime ? 'text-blue-900 font-semibold' : ''
              }`}
              placeholderText="Select expiration date"
              required
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Additional Notes</label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any special instructions..."
              className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 ${
                formData.additionalNotes ? 'text-blue-900 font-semibold' : ''
              }`}
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transform transition"
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

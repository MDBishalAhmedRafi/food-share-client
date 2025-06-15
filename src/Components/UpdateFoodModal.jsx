import React, { useState, useEffect } from 'react';

const UpdateFoodModal = ({ food, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    foodQuantity: '',
    pickupLocation: '',
    expiredDateTime: '',
    additionalNotes: '',
  });

  useEffect(() => {
    if (food) {
      setFormData({
        foodName: food.foodName || '',
        foodImage: food.foodImageUrl || '',
        foodQuantity: food.foodQuantity || '',
        pickupLocation: food.pickupLocation || '',
        expiredDateTime: food.expiredDateTime || '',
        additionalNotes: food.additionalNotes || '',
      });
    }
  }, [food]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!food) return null;  // Prevent rendering if no food

  return (
    <div className="modal">
      {/* modal markup */}
      <input name="foodName" value={formData.foodName} onChange={handleChange} />
      {/* other inputs similarly */}
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default UpdateFoodModal;

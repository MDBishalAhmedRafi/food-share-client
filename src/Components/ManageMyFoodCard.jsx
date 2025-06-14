import React from 'react';

const ManageMyFoodCard = ({food}) => {
                return (
                                <div>
                                         <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={food.userImage}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{food.userName}</div>
              <div className="text-sm opacity-50">{food.userEmail}</div>
            </div>
          </div>
        </td>
        <td>
          {food.pickupLocation}
        </td>
        <td>{food.expiredDateTime}</td>
        <th>
          <button className="btn btn-ghost btn-xs">Update</button>
        </th>
      </tr>       
                                </div>
                );
};

export default ManageMyFoodCard;
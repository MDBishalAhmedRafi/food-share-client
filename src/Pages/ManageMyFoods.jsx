import React, { use, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import ManageMyFoodCard from '../Components/ManageMyFoodCard';

const ManageMyFoods = () => {
                const addedFoods = useLoaderData();
                const [foods, setFoods] = useState(addedFoods)
                const {user} = use(AuthContext);
                const getFoods = () => { 
                                fetch(`http://localhost:3000/my-foods/${user.email}`)
                                .then((res) => res.json())
                                .then((data) => { 
                                                console.log(data);
                                                setFoods(data)
                                })
                }
                return (
                                <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
     { foods.map(food => <ManageMyFoodCard key={food._id} getFoods={getFoods} setFoods={getFoods} food={food}></ManageMyFoodCard>)}
    </tbody>
  </table>
</div>
                );
};

export default ManageMyFoods;
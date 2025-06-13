import React from 'react';
import { useLoaderData } from 'react-router';

const FoodDetails = () => {
                const {foodName, foodImage, foodQuantity, pickupLocation, expiredDateTime, additionalNotes, foodStatus} = useLoaderData();
            
                return (
                                 <div className="card lg:card-side bg-base-100 shadow-sm lg:p-4 md:p-3 p-2 lg:w-11/12 lg:mx-auto mx-2 lg:mb-10 md:mb-7 mb-5">
      <figure className='lg:w-5/12 '>
        <img className='rounded-3xl' src={foodImage} alt="Recipe" />
      </figure>
      <div className="card-body">
        {/* <p className="text-lg font-bold dark:text-indigo-700 text-red-700">{likeCount} people interested in this recipe</p> */}
        <h2 className="card-title font-bold">{foodName}</h2>
        <p className='font-bold'>Total-Quantity: {foodQuantity}</p>
        <p className='font-bold'>Pickup-Location: {pickupLocation}</p>
        <p className='font-bold'>Expire-Date: {expiredDateTime}</p>
        <p className='font-bold'>Preparation-Time: {additionalNotes}</p>
        <p className='font-bold'>Food-Status: {foodStatus}</p>
        <div className="card-actions justify-end">
                <button className="btn btn-primary">Request</button>
        </div>


        {/* {details.categories.map((cate, index) => (
          <p className='font-bold' key={index}>Categories: {cate}</p>
        ))} */}
        {/* <div className="card-actions justify-end">
          <button
            onClick={handleLike}
            className="btn btn-primary"
            // disabled={hasLiked}
          >
            {hasLiked ? "Liked" : "Like"}
          </button>
        </div> */}
      </div>
    </div>
                );
};

export default FoodDetails;
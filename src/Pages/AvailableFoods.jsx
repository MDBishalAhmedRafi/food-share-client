import React from "react";
import { useLoaderData } from "react-router";
import AvailableFoodsCard from "../Components/AvailableFoodsCard";

const AvailableFoods = () => {
  const allFoods = useLoaderData();
  return (
    <div className="lg:w-11/12 lg:mx-auto mx-2 lg:mb-10 md:mb-7 mb-5  bg-gradient-to-r from-yellow-300 via-orange to-blue-200 rounded-3xl lg:p-4 md:p-3 p-2">
                <h1 className="text-center text-primary text-3xl font-bold mb-8">All Available Foods</h1>
      <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 grid-cols-1">
        {allFoods.map((singleFood) => (
          <AvailableFoodsCard
            key={singleFood._id}
            singleFood={singleFood}
          ></AvailableFoodsCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;

// import React from "react";
// import { useLoaderData, useNavigate, useLocation } from "react-router";
// import AvailableFoodsCard from "../Components/AvailableFoodsCard";

// const AvailableFoods = () => {
//   const allFoods = useLoaderData();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSortChange = (e) => {
//     const selectedSort = e.target.value;
//     const searchParams = new URLSearchParams(location.search);
//     searchParams.set('sort', selectedSort);
//     navigate(`?${searchParams.toString()}`);
//   };

//   return (
//     <div className="lg:w-11/12 lg:mx-auto mx-2 lg:mb-10 md:mb-7 mb-5 bg-gradient-to-r from-yellow-300 via-orange to-blue-200 rounded-3xl lg:p-4 md:p-3 p-2">
//       <h1 className="text-center text-primary text-3xl font-bold mb-8">All Available Foods</h1>

//       {/* Sort Dropdown */}
//       <div className="mb-4 flex justify-end">
//         <select
//           className="border p-2 rounded text-black"
//           onChange={handleSortChange}
//           defaultValue=""
//         >
//           <option value="">Sort By</option>
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 grid-cols-1">
//         {allFoods.map((singleFood) => (
//           <AvailableFoodsCard key={singleFood._id} singleFood={singleFood} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AvailableFoods;

import React, { useState, useEffect } from "react";
import AvailableFoodsCard from "../Components/AvailableFoodsCard";

const AvailableFoods = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:3000/available-foods");
        const data = await res.json();
        console.log("Loaded data:", data);
        setAllFoods(data);
        setFilteredFoods(data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, []);

  const handleSearch = () => {
    let filtered = [...allFoods];

    // Apply search
    if (searchText.trim() !== "") {
      filtered = filtered.filter((food) =>
        food.foodName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply sort (if selected)
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.foodName.localeCompare(b.foodName));
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.foodName.localeCompare(a.foodName));
    }

    setFilteredFoods(filtered);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortOrder(sortValue);

    // Re-apply sort on existing filtered data
    let sorted = [...filteredFoods];
    if (sortValue === "asc") {
      sorted.sort((a, b) => a.foodName.localeCompare(b.foodName));
    } else if (sortValue === "desc") {
      sorted.sort((a, b) => b.foodName.localeCompare(a.foodName));
    }

    setFilteredFoods(sorted);
  };

  return (
    <div className="lg:w-11/12 lg:mx-auto mx-2 lg:mb-10 md:mb-7 mb-5 bg-gradient-to-r from-yellow-300 via-orange to-blue-200 rounded-3xl lg:p-4 md:p-3 p-2">
      <h1 className="text-center text-primary text-3xl font-bold mb-8">All Available Foods</h1>

      {/* Search & Sort */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex gap-2 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search food name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border p-2 rounded text-black w-full"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <select
          className="border p-2 rounded text-black"
          onChange={handleSortChange}
          value={sortOrder}
        >
          <option value="">Sort By</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {filteredFoods.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 grid-cols-1">
          {filteredFoods.map((singleFood) => (
            <AvailableFoodsCard key={singleFood._id} singleFood={singleFood} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No foods found.</p>
      )}
    </div>
  );
};

export default AvailableFoods;





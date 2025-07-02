// import React, { useEffect, useState } from "react";
// import { useLoaderData, useNavigate, useLocation } from "react-router";
// import AvailableFoodsCard from "../Components/AvailableFoodsCard";

// const AvailableFoods = () => {
//   const allFoods = useLoaderData();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [filteredFoods, setFilteredFoods] = useState(allFoods);
//   const [searchText, setSearchText] = useState("");
//   const [sorting, setSorting] = useState("");

//   const handleSortChange = (e) => {
//     const selectedSort = e.target.value;
//     const searchParams = new URLSearchParams(location.search);
//     searchParams.set('sort', selectedSort);
//     navigate(`?${searchParams.toString()}`);
    
//     setSorting(selectedSort)
//   };
  
//   useEffect(() => {
//   const getData = async () => {
//     try {
//       const res = await fetch(`https://food-sharing-server-coral.vercel.app/available-foods?sort=${sorting}`);
//       const result = await res.json();
//       setFilteredFoods(result);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   getData();
// }, [sorting]);

//   const handleSearch = () => {

//     // Apply search
//     if (searchText.trim() !== "") {
//       const filtered = filteredFoods.filter((food) =>
//         food.foodName.toLowerCase().includes(searchText.toLowerCase())
//       );
//       setFilteredFoods(filtered)
//     }
//     else{ 
//       setFilteredFoods(allFoods)
//     }
//   }

//   return (
//     <div className="lg:w-11/12 lg:mx-auto mx-2 lg:mb-10 md:mb-7 mb-5 bg-gradient-to-r from-[#F1FAEE] via-orange to-[#2A9D8F] rounded-3xl lg:p-4 md:p-3 p-2">
//       <h1 className="text-center text-[#333333] text-3xl font-bold mb-8">All Available Foods</h1>

//       <div className="flex gap-2 w-full md:w-1/2">
//           <input
//             type="text"
//             placeholder="Search food name..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             className="border p-2 rounded text-black w-full"
//           />
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//             onClick={handleSearch}
//           >
//             Search
//           </button>
//         </div>

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
//         {filteredFoods.map((singleFood) => (
//           <AvailableFoodsCard key={singleFood._id} singleFood={singleFood} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AvailableFoods;

import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router";
import AvailableFoodsCard from "../Components/AvailableFoodsCard";

const AvailableFoods = () => {
  const allFoods = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const [filteredFoods, setFilteredFoods] = useState(allFoods);
  const [searchText, setSearchText] = useState("");
  const [sorting, setSorting] = useState("");

  // Layout toggle state (only for large screens)
  const [isThreeColumn, setIsThreeColumn] = useState(true);

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", selectedSort);
    navigate(`?${searchParams.toString()}`);
    setSorting(selectedSort);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`https://food-sharing-server-coral.vercel.app/available-foods?sort=${sorting}`);
        const result = await res.json();
        setFilteredFoods(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [sorting]);

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      const filtered = filteredFoods.filter((food) =>
        food.foodName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods(allFoods);
    }
  };

  return (
    <div className="lg:mt-21 md:mt-21 mt-21 lg:w-11/12 lg:mx-auto mx-2 lg:mb-10 md:mb-7 mb-5 bg-gradient-to-r from-[#F1FAEE] via-orange to-[#2A9D8F] rounded-3xl lg:p-4 md:p-3 p-2">
      <h1 className="text-center text-[#333333] text-3xl font-bold mb-8">All Available Foods</h1>

      <div className="flex gap-2 w-full md:w-1/2 mb-4">
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

      {/* Sort and Layout Toggle (visible only on large screens) */}
      <div className="mb-4 flex justify-between items-center">
        <select
          className="border p-2 rounded text-black"
          onChange={handleSortChange}
          defaultValue=""
        >
          <option value="">Sort By</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        {/* Layout toggle button - only show on large screens */}
        <button
          onClick={() => setIsThreeColumn(!isThreeColumn)}
          className="hidden lg:inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Change Layout 
        </button>
      </div>

      {/* Grid layout */}
      <div
        className={`grid ${
          isThreeColumn ? "lg:grid-cols-3" : "lg:grid-cols-2"
        } gap-6 md:grid-cols-2 grid-cols-1`}
      >
        {filteredFoods.map((singleFood) => (
          <AvailableFoodsCard key={singleFood._id} singleFood={singleFood} />
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;






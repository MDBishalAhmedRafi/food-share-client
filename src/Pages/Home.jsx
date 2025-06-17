// import React, { use } from 'react';
// import Hero from '../Components/Hero';
// import CustomersImpacts from '../Components/CustomersImpacts';
// import HowItWorks from '../Components/HowItWorks';
// import FeaturedFoods from '../Components/FeaturedFoods';
// import { Link, useLoaderData } from 'react-router';
// import { AuthContext } from '../Provider/AuthProvider';

// const Home = () => {
//   const {user} = use(AuthContext)
//   console.log(user);
//         const foods = useLoaderData();
//         console.log(foods);
//                 return (
//                                 <div className='lg:w-11/12 lg:mx-auto mx-2'>
//                                         <Hero></Hero>
//                                         <section className='bg-gradient-to-r from-[#F1FAEE] via-orange to-[#2A9D8F] rounded-2xl lg:mt-10 md:mt-7 mt-5 lg:mb-10 md:mb-7 mb-5 lg:p-4 md:p-3 p-2'>
//                                                 <h1 className='text-4xl font-extrabold text-center text-[#333333] mb-4'>Our Featured Foods</h1>
//                                                 <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 grid-cols-1 lg:mb-10 md:mb-7 mb-5">
//                                                 {foods.map((food) => (
//             <FeaturedFoods key={food._id} food={food} />
//           ))}
//                                         </div>
//                                         <div className="text-center">
//           <Link to='/available-foods'>
//             <button className="btn btn-sm bg-[#2A9D8F90] text-[#333333] hover:bg-[#2A9D8F] hover:text-white font-bold">
//               See All Foods
//             </button>
//           </Link>
//         </div>
//                                         </section>
//                                         <CustomersImpacts></CustomersImpacts>
//                                         <HowItWorks></HowItWorks>
//                                 </div>
//                 );
// };

// export default Home;

import React, { useEffect } from 'react';
import Hero from '../Components/Hero';
import CustomersImpacts from '../Components/CustomersImpacts';
import HowItWorks from '../Components/HowItWorks';
import FeaturedFoods from '../Components/FeaturedFoods';
import { Link } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import Loading from './Loading';

const fetchFoods = async () => {
  const res = await fetch('http://localhost:3000/foods');
  if (!res.ok) {
    throw new Error('Failed to fetch foods');
  }
  return res.json();
};

const Home = () => {
  const {
    mutate: getFoods,
    data: foods,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: fetchFoods,
  });

  useEffect(() => {
    getFoods(); // fetch data once when component mounts
  }, [getFoods]);

  if (isPending) return <Loading />;
  if (isError) return <p className="text-red-500 text-center">{error.message}</p>;

  return (
    <div className='lg:w-11/12 lg:mx-auto mx-2'>
      <Hero />
      <section className='bg-gradient-to-r from-[#F1FAEE] via-orange to-[#2A9D8F] rounded-2xl lg:mt-10 md:mt-7 mt-5 lg:mb-10 md:mb-7 mb-5 lg:p-4 md:p-3 p-2'>
        <h1 className='text-4xl font-extrabold text-center text-[#333333] mb-4'>Our Featured Foods</h1>
        <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 grid-cols-1 lg:mb-10 md:mb-7 mb-5">
          {foods?.map((food) => (
            <FeaturedFoods key={food._id} food={food} />
          ))}
        </div>
        <div className="text-center">
          <Link to='/available-foods'>
            <button className="btn btn-sm bg-[#2A9D8F90] text-[#333333] hover:bg-[#2A9D8F] hover:text-white font-bold">
              See All Foods
            </button>
          </Link>
        </div>
      </section>
      <CustomersImpacts />
      <HowItWorks />
    </div>
  );
};

export default Home;

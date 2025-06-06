import React from 'react';
import Hero from '../Components/Hero';
import CustomersImpacts from '../Components/CustomersImpacts';
import HowItWorks from '../Components/HowItWorks';

const Home = () => {
                return (
                                <div className='lg:w-11/12 lg:mx-auto mx-2'>
                                        <Hero></Hero>
                                        
                                        <CustomersImpacts></CustomersImpacts>
                                        <HowItWorks></HowItWorks>
                                </div>
                );
};

export default Home;
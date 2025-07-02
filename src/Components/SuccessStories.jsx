import React from "react";
import { motion } from "framer-motion";

const stories = [
  {
    id: 1,
    image: "https://i.ibb.co/wrGLLph/success1.jpg",
    title: "100+ Meals Shared in Eid Week",
    description: "During Eid, our users came together to donate over 100 meals in just 3 days across Dhaka.",
  },
  {
    id: 2,
    image: "https://i.ibb.co/vjw7nZ9/success2.jpg",
    title: "Student Initiative in Chittagong",
    description: "A group of university students donated fresh home-cooked food to a local shelter daily for a week.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/pKdk0rS/success3.jpg",
    title: "Community Fridge Collaboration",
    description: "Partnered with local volunteers to supply a free fridge in Sylhet with meals every weekend.",
  },
];

const SuccessStories = () => {
  return (
    <div className="my-16 p-4 lg:p-8 md:p-6 bg-gradient-to-r from-[#F1FAEE] via-orange to-[#2A9D8F] rounded-2xl">
      <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#264653] mb-10">
        Inspiring Success Stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <img src={story.image} alt={story.title} className="h-48 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#2A9D8F] mb-2">{story.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{story.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;

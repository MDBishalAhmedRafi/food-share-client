import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaPlusCircle } from "react-icons/fa";

const CallToAction = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-[#F1FAEE] via-orange to-[#2A9D8F] rounded-2xl text-white py-12 px-6 lg:mt-10 md:mt-7 mt-5 lg:mb-10 md:mb-7 mb-5 text-center shadow-lg"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#333333]">Start Sharing, Start Caring 💚</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto text-[#333333]">
        Be a part of something meaningful. Share your extra food and help those in need. You can also request food if you're looking for support.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link to="/add-foods">
          <button className="btn bg-white dark:bg-gray-700 text-[#2A9D8F] hover:bg-gray-100 font-bold flex items-center gap-2">
            <FaPlusCircle /> Donate Food
          </button>
        </Link>
        <Link to="/available-foods">
          <button className="btn bg-white dark:bg-gray-700 text-[#E76F51] hover:bg-gray-100 font-bold flex items-center gap-2">
            <FaHandHoldingHeart /> Request Food
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CallToAction;

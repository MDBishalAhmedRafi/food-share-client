import React, { useState, useEffect } from "react";
import { HandHeart, Users, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

// Statistic items
const items = [
  {
    icon: <HandHeart className="w-10 h-10 text-[#333333] mx-auto mb-3" />,
    label: "Meals Donated",
    value: 4500,
  },
  {
    icon: <Users className="w-10 h-10 text-[#333333] mx-auto mb-3" />,
    label: "Volunteers",
    value: 2000,
  },
  {
    icon: <Star className="w-10 h-10 text-[#333333] mx-auto mb-3" />,
    label: "Families Helped",
    value: 1200,
  },
];

// Testimonials array (now with 6!)
const testimonials = [
  {
    name: "Priya M.",
    quote: "Thanks to this platform, I found a way to help others with something as simple as leftover food.",
  },
  {
    name: "Anwar R.",
    quote: "Volunteering here gave me purpose. Every meal counts, and I see it firsthand.",
  },
  {
    name: "Lina K.",
    quote: "I was hesitant at first, but now I regularly donate my extra food. It feels amazing!",
  },
  {
    name: "Carlos T.",
    quote: "Seeing my neighbors benefit from food I’d normally waste is truly rewarding.",
  },
  {
    name: "Fatima B.",
    quote: "This app helps fight hunger and food waste at the same time. Beautiful mission!",
  },
  {
    name: "Joseph N.",
    quote: "I’ve met so many kind people just by sharing what I had. Community really matters.",
  },
];

// Fade animation for cards
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const CustomersImpacts = () => {
  const [current, setCurrent] = useState(0);

  // Automatically rotate testimonial every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 px-4 md:px-20 bg-gradient-to-r from-[#F1FAEE] via-orange to-[#2A9D8F] rounded-2xl">
      {/* Title */}
      <motion.h2
        className="text-4xl font-extrabold text-center text-[#333333] mb-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Our Impact So Far
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-center text-[#333333] mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Together, we're reducing food waste and helping communities.
      </motion.p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto mb-14">
        {items.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md text-center transition transform hover:scale-105 hover:shadow-xl"
          >
            {item.icon}
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              <CountUp end={item.value} duration={5} separator="," />+
            </h3>
            <p className="text-gray-600 dark:text-white text-sm">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonial Slider */}
      <div className="max-w-3xl mx-auto text-center text-[#333333] text-lg relative h-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="absolute w-full"
          >
            <p className="italic mb-2 px-4">“{testimonials[current].quote}”</p>
            <strong className="block text-[#333333]">{testimonials[current].name}</strong>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomersImpacts;

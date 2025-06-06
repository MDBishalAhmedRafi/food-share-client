import React from "react";
import { Upload, LocateFixed, SmilePlus, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

// Step content data
const steps = [
  {
    icon: Upload,
    title: "Post Food",
    desc: "Add details about the extra food you want to share.",
  },
  {
    icon: LocateFixed,
    title: "Get Matched",
    desc: "Nearby seekers will see your listing instantly.",
  },
  {
    icon: SmilePlus,
    title: "Connect",
    desc: "Chat, confirm the pickup, and make a new connection.",
  },
  {
    icon: CheckCircle,
    title: "Share & Smile",
    desc: "Hand over the food and spread happiness.",
  },
];

const HowItWorks = () => {
  return (
    // Animate the entire section when it scrolls into view
                <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative py-20 px-4 md:px-20 bg-gradient-to-b from-green-50 to-white overflow-hidden lg:mt-10 md:mt-7 mt-5"
    >
      {/* Decorative blurred background blobs */}
      <div className="absolute top-[-80px] left-[-60px] w-[200px] h-[200px] bg-green-200 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-80px] right-[-60px] w-[200px] h-[200px] bg-green-300 opacity-30 rounded-full blur-2xl z-0" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-green-700"
        >
          Sharing food is now as easy as a few simple steps.
        </motion.p>
      </div>

      {/* Steps Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
       {steps.map((step, index) => (
  <motion.div
    key={index}
  >
    <motion.div
      whileHover={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 0.6 }}
    >
      {React.createElement(step.icon, {
        className: "w-12 h-12 text-green-600 mx-auto mb-4",
      })}
    </motion.div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{step.title}</h3>
    <p className="text-sm text-gray-600 text-center">{step.desc}</p>
  </motion.div>
))}
      </div>
    </motion.div>
  );
};

export default HowItWorks;

import React from 'react';
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Lottie from "lottie-react";
import animationData from '../assets/Food-share.json'

const Footer = () => {
                return (
                                <div className="bg-gradient-to-r from-[#F1FAEE] via-orange to-[#2A9D8F] rounded-2xl text-[#333333] pt-12 pb-6 px-4 md:px-16 relative overflow-hidden">
                                           {/* Lottie background decoration */}
      <div className="absolute top-15 -right-5 w-[180px] opacity-60 pointer-events-none">
        <Lottie animationData={animationData} loop autoplay />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto"
      >
        {/* Column 1: Logo + Mission */}
        <div>
          <h3 className="text-2xl font-extrabold text-[#333333] mb-2">FoodShare</h3>
          <p className="text-sm leading-relaxed">
            Our mission is to reduce food waste and support local communities
            by making food donation simple and accessible to everyone.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className='font-bold'>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/donate" className="hover:underline">Donate Food</a></li>
            <li><a href="/receive" className="hover:underline">Receive Food</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Column 3: Newsletter Signup */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
          <p className="text-sm mb-3">Subscribe to our newsletter:</p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email"
              required
              className="px-3 py-2 rounded-lg border border-[#333333] focus:outline-none focus:ring-2 focus:[#333333]"
            />
            <button
              type="submit"
              className="bg-[#2A9D8F] text-white py-2 rounded-lg cursor-pointer transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Column 4: Contact + Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-sm mb-2">hello@foodshare.org</p>
          <div className="flex space-x-4 mt-3">
            <a href="#"><Facebook className="w-5 h-5 text-[#333333] hover:text-green-900" /></a>
            <a href="#"><Twitter className="w-5 h-5 text-[#333333] hover:text-green-900" /></a>
            <a href="#"><Instagram className="w-5 h-5 text-[#333333] hover:text-green-900" /></a>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-10 border-t border-[#333333] pt-4 text-center text-xs text-[#333333] relative z-10"
      >
        © {new Date().getFullYear()} FoodShare. All rights reserved.
      </motion.div>   
                                </div>
                );
};

export default Footer;
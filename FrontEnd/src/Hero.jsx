import React from "react";
import { motion } from "framer-motion";
import blood from "./blood-donation.png"
import blood1 from "./imgg.png"

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#ff003c] via-[#ff4b5c] to-[#8e2de2] flex items-center justify-center overflow-hidden">
      
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-400/20 rounded-full blur-3xl"></div>

      
      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-10">
      
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-tight"
          >
            Save <span className="text-yellow-300">Lives</span> <br />
            with <span className="text-red-100">Every Drop</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-pink-100 max-w-md mx-auto lg:mx-0 leading-relaxed"
          >
            BloodBuddy connects donors with patients in need — fast, reliable,
            and community-driven. Your one donation could be someone’s second
            chance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4"
          >
            <a
              href="/find-donor"
              className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-red-50 hover:scale-105 transition transform duration-300"
            >
              Find a Donor
            </a>
            <a
              href="/become-donor"
              className="bg-yellow-400 text-red-900 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-yellow-300 hover:scale-105 transition transform duration-300"
            >
              Become a Donor
            </a>
          </motion.div>
        </div>

      
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="lg:w-1/2 flex justify-center relative"
        >
          {/* 3D Blood Illustration */}
          <img
            src={blood1 }
            alt="Blood Donation 3D Illustration"
            className="w-[420px] drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />

        
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/4661/4661995.png"
            alt="Blood Drop"
            className="w-10 absolute top-10 right-20 animate-bounce"
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/4661/4661995.png"
            alt="Blood Drop"
            className="w-8 absolute bottom-16 left-20 animate-pulse"
            transition={{ repeat: Infinity, duration: 3 }}
          />
        </motion.div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,256L60,229.3C120,203,240,149,360,133.3C480,117,600,139,720,165.3C840,192,960,224,1080,208C1200,192,1320,128,1380,96L1440,64V320H0Z"
        ></path>
      </svg>
    </section>
  );
};

export default Hero;

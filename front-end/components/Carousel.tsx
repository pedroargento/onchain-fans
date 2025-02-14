"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "/bg1.jpg",
  "/bg1.jpg",
  // "/bg2.jpg",
];

export default function HeroCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-full flex flex-col flex-wrap items-center justify-center h-[20vh] mt-20 font-bold relative overflow-hidden"
      animate={{ backgroundImage: `url(${images[currentImage]})` }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      <h1 className="text-white text-4xl z-10">Marketplace</h1>
      <a className="text-white text-xl z-10">Sell and collect art with protection on web3</a>
    </motion.div>
  );
}
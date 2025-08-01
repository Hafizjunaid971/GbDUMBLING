// import { Link } from "react-router-dom";
// import { assets } from "../assets/assets";
// import mainBanner from "../assets/gb14.jpeg";

// const Banner = () => {
//   return (
//     <div className="relative" >
//  <img
//   src={mainBanner}
//   alt="Banner"
//   className="w-full h-60 md:h-80"
//   style={{ width: "100%" }}
// />


//       <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24">
     
//       </div>
//     </div>
//   );
// };
// export default Banner;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import banner1 from "../assets/gb21.jpeg";
import banner2 from "../assets/gb24.jpeg"; // Apni dusri image yahan import karo
import banner3 from "../assets/gb25.jpeg"; // Teesri image yahan import karo

const images = [banner1, banner2, banner3];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
  <div className="relative w-full flex justify-center bg-black">
  <img
    src={images[currentIndex]}
    alt={`Banner ${currentIndex + 1}`}
    className="w-full max-w-screen "
    style={{ maxHeight: "80vh" }}
  />

      {/* Controls */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-70"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-70"
      >
        &#10095;
      </button>

      {/* Optional Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-yellow-400" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24 pointer-events-none">
        {/* Add any text/buttons you want here */}
      </div>
    </div>
  );
};

export default Banner;

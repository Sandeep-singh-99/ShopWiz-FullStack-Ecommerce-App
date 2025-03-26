import React from "react";
import { useNavigate } from "react-router-dom";


import img1 from "../assests/category/mouse.webp";
import img2 from "../assests/category/airpodes.webp";
import img3 from "../assests/category/camera.jpg";
import img4 from "../assests/category/earpodes.webp";
import img5 from "../assests/category/mobile.webp";
import img6 from "../assests/category/printer.webp";
import img7 from "../assests/category/Processor.png";
import img8 from "../assests/category/refrigerator.webp";
import img9 from "../assests/category/speaker.webp";
import img10 from "../assests/category/tv.webp";
import img11 from "../assests/category/trimmers.webp";
import img12 from "../assests/category/watch.webp";

export default function HorizontalCategory() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Mouse", img: img1 },
    { id: 2, name: "Airpodes", img: img2 },
    { id: 3, name: "Camera", img: img3 },
    { id: 4, name: "Earphones", img: img4 },
    { id: 5, name: "Mobiles", img: img5 },
    { id: 6, name: "Printers", img: img6 },
    { id: 7, name: "Processor", img: img7 },
    { id: 8, name: "Refrigerator", img: img8 },
    { id: 9, name: "Speakers", img: img9 },
    { id: 10, name: "TV", img: img10 },
    { id: 11, name: "Trimmers", img: img11 },
    { id: 12, name: "Watches", img: img12 },
  ];

  return (
    <div className="container mx-auto py-4 px-2 sm:px-4 md:px-8 lg:px-16">
      {/* Scrollable horizontal layout for mobile with hidden scrollbar, grid for larger screens */}
      <div
        className="flex overflow-x-auto space-x-4 pb-4 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 sm:space-x-0 sm:overflow-x-hidden 
        scrollbar-hide"
      >
        {categories.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-28 sm:w-auto cursor-pointer flex flex-col items-center group transition-all duration-300 ease-in-out hover:bg-gray-50 rounded-lg p-2"
            onClick={() => navigate(`/category/${item.name}`)}
          >
            {/* Category Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white shadow-md rounded-md overflow-hidden flex items-center justify-center transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:scale-105 border border-gray-100">
              <img
                loading="lazy"
                className="w-full h-full object-contain p-2 transition-transform duration-300 ease-in-out group-hover:scale-110"
                src={item.img}
                alt={item.name}
                width="100%"
                height="100%"
              />
            </div>

            {/* Category Name */}
            <span className="mt-2 text-xs sm:text-sm md:text-base font-medium text-white text-center transition-colors duration-200 group-hover:text-blue-600">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

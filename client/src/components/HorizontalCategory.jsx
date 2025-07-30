import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/category/mouse.webp";
import img2 from "../assets/category/airpodes.webp";
import img3 from "../assets/category/camera.jpg";
import img4 from "../assets/category/earpodes.webp";
import img5 from "../assets/category/mobile.webp";
import img6 from "../assets/category/printer.webp";
import img7 from "../assets/category/Processor.png";
import img8 from "../assets/category/refrigerator.webp";
import img9 from "../assets/category/speaker.webp";
import img10 from "../assets/category/tv.webp";
import img11 from "../assets/category/trimmers.webp";
import img12 from "../assets/category/watch.webp";

export default function HorizontalCategory() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Mouse", img: img1 },
    { id: 2, name: "Airpodes", img: img2 },
    { id: 3, name: "Camera", img: img3 },
    { id: 4, name: "Earphones", img: img4 },
    { id: 5, name: "Mobiles", img: img5 },
    { id: 6, name: "Printers", img: img6 },
    { id: 7, name: "Processors", img: img7 },
    { id: 8, name: "Refrigerators", img: img8 },
    { id: 9, name: "Speakers", img: img9 },
    { id: 10, name: "TVs", img: img10 },
    { id: 11, name: "Trimmers", img: img11 },
    { id: 12, name: "Watches", img: img12 },
  ];

  return (
    <section className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Section Heading */}
      <div className="flex items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Explore Categories
        </h2>
      </div>

      {/* Category Container */}
      <div className="relative">
        <div
          className="flex overflow-x-auto space-x-4 pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:overflow-x-hidden snap-x snap-mandatory scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {categories.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-36 sm:w-auto cursor-pointer group transition-all duration-300 ease-in-out rounded-lg p-3 "
              onClick={() => navigate(`/category/${item.name}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/category/${item.name}`)}
            >
              {/* Category Image */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-gray-300 transition-all duration-300 group-hover:border-indigo-200 group-hover:shadow-md">
                <img
                  loading="lazy"
                  className="w-full h-full object-contain p-4 transition-transform duration-300 ease-in-out group-hover:scale-105"
                  src={item.img}
                  alt={`Shop ${item.name} category`}
                  width="100%"
                  height="100%"
                />
              </div>
              {/* Category Name */}
              {/* <span className="mt-3 text-sm sm:text-base text-center font-semibold text-gray-800 transition-colors duration-300 group-hover:text-indigo-600">
                {item.name}
              </span> */}
            </div>
          ))}
        </div>

        {/* Scroll Controls for Mobile */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:hidden">
          <button
            aria-label="Scroll left"
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
            onClick={() =>
              document.querySelector(".snap-x").scrollBy({ left: -150, behavior: "smooth" })
            }
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            aria-label="Scroll right"
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
            onClick={() =>
              document.querySelector(".snap-x").scrollBy({ left: 150, behavior: "smooth" })
            }
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
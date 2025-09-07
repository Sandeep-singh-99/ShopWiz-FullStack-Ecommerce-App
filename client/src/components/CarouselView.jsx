import React, { useEffect, useState, useCallback, useRef } from "react";
import image1 from "../assets/img1.webp";
import image2 from "../assets/img2.webp";
import image3 from "../assets/img3.jpg";
import image4 from "../assets/img4.jpg";
import image5 from "../assets/img5.webp";
import image1Mobile from "../assets/img1_mobile.jpg";
import image2Mobile from "../assets/img2_mobile.webp";
import image3Mobile from "../assets/img3_mobile.jpg";
import image4Mobile from "../assets/img4_mobile.jpg";
import image5Mobile from "../assets/img5_mobile.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const touchStartX = useRef(0);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const images = window.innerWidth < 768 ? mobileImages : desktopImages;

  /** Next Image */
  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, [images.length]);

  /** Previous Image */
  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  /** Auto Slide */
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  /** Preload next image */
  useEffect(() => {
    const nextIndex = (currentImage + 1) % images.length;
    const preload = new Image();
    preload.src = images[nextIndex];
  }, [currentImage, images]);

  /** Handle Touch for Mobile */
  const handleTouchStart = (e) => {
    setIsTouching(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    setIsTouching(false);
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) prevImage(); // Swipe Right
    if (deltaX < -50) nextImage(); // Swipe Left
  };

  return (
    <div className="container mx-auto px-4 rounded-xl overflow-hidden">
      <div
        className="relative h-56 md:h-80 w-full rounded-xl shadow-lg overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Images */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((imageUrl, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img
                src={imageUrl}
                alt={`Banner ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={index === 0 ? "high" : "low"}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black/40 to-transparent pointer-events-none hidden md:block"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black/40 to-transparent pointer-events-none hidden md:block"></div>

        {/* Navigation Buttons (Desktop only) */}
        <div className="absolute inset-0 hidden md:flex items-center justify-between px-3">
          <button
            onClick={prevImage}
            aria-label="Previous image"
            className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition"
          >
            <FaAngleLeft className="text-gray-800 text-xl" />
          </button>
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition"
          >
            <FaAngleRight className="text-gray-800 text-xl" />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentImage === index
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;

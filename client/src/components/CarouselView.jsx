import React, { useEffect, useState, useCallback } from "react";
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

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  
  const nextImage = useCallback(() => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    } else {
      setCurrentImage(0);
    }
  }, [currentImage, desktopImages.length]);

  const prevImage = useCallback(() => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  }, [currentImage]);

  
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  
  useEffect(() => {
    const nextIndex = (currentImage + 1) % desktopImages.length;
    const preloadDesktop = new Image();
    const preloadMobile = new Image();
    preloadDesktop.src = desktopImages[nextIndex];
    preloadMobile.src = mobileImages[nextIndex];
  }, [currentImage, desktopImages, mobileImages]);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        {/* Navigation buttons */}
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button
              onClick={prevImage}
              className="bg-white shadow-md rounded-full p-1"
              aria-label="Previous image"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1"
              aria-label="Next image"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Desktop version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageUrl, index) => (
            <div
              key={`desktop-${index}`}
              className="w-full h-full min-w-full min-h-full transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageUrl}
                alt={`Banner ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"} 
                decoding="async"
                className="w-full h-full object-cover"
                fetchpriority={index === 0 ? "high" : "low"} 
              />
            </div>
          ))}
        </div>

        {/* Mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((imageUrl, index) => (
            <div
              key={`mobile-${index}`}
              className="w-full h-full min-w-full min-h-full transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageUrl}
                alt={`Banner ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover"
                fetchpriority={index === 0 ? "high" : "low"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;

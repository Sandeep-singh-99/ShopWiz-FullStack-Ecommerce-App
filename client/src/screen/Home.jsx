import React, { useEffect } from "react";
import CarouselView from "../components/CarouselView";
import HorizontalCategory from "../components/HorizontalCategory";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../redux/slice/auth-slice";
import { countCartProduct, restartCartCount } from "../redux/slice/cart-slice";

// Configuration for HorizontalCardProduct components
const productCategories = [
  { category: "Mouse", heading: "Top Mouse" },
  { category: "Airpodes", heading: "Top Earbuds" },
  { category: "Camera", heading: "Top Cameras" },
  { category: "Earphones", heading: "Top Earphones" },
  { category: "Mobiles", heading: "Top Mobiles" },
  { category: "Printers", heading: "Top Printers" },
  { category: "Processor", heading: "Top Processors" },
  { category: "Refrigerator", heading: "Top Refrigerators" },
  { category: "Speakers", heading: "Top Speakers" },
  { category: "TV", heading: "Top TVs" },
  { category: "Trimmers", heading: "Top Trimmers" },
  { category: "Watches", heading: "Top Watches" },
];

export default function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(countCartProduct());
    } else {
      dispatch(restartCartCount());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-10">
        {/* Hero Banner */}
        <CarouselView />

        {/* Horizontal Categories */}
        <section className="bg-white shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <HorizontalCategory />
          </div>
        </section>

        {/* Product Sections */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {productCategories.map(({ category, heading }) => (
            <div
              key={category}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <HorizontalCardProduct category={category} heading={heading} />
            </div>
          ))}
        </section>

        {/* Promotional Section */}
        <section className="bg-[#db4444] text-white py-12 mt-10">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Limited Time Offers</h2>
            <p className="text-lg mb-6">
              Grab the best deals before they're gone! Huge discounts on top brands.
            </p>
            <button className="bg-white text-[#db4444] font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition">
              Shop Now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

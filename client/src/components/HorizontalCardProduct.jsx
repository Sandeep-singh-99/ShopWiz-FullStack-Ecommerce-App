import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000";

const ProductCard = lazy(() => import("./ProductCard")); // Lazy Loading

export default function HorizontalCardProduct({ category, heading }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const memoizedCategories = useMemo(() => categories, [categories]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/api/getProductByCategory/categorywise/${category}`
        );
        setCategories(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load products. Please try again.");
        setLoading(true);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 my-4 relative">
      {/* Section Heading */}
      <div className="flex items-center gap-3 pb-4">
        <div className="bg-[#db4444] w-4 h-10 rounded"></div>
        <h2 className="font-semibold text-[16px] text-[#db4444]">{heading}</h2>
      </div>

      {/* Product List */}
      <div className="flex items-center gap-6 whitespace-nowrap Scrollbar-hide overflow-hidden overflow-x-auto transition-all">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-[280px] h-[420px] rounded-lg shadow-lg animate-pulse flex flex-col p-4"
              >
                <div className="h-80 bg-gray-300 rounded-md mb-4"></div>
                <div className="h-10 bg-gray-300 rounded-md mb-2"></div>
                <div className="h-10 bg-gray-300 rounded-md"></div>
              </div>
            ))
          : memoizedCategories.slice(0, 4).map((product) => (
              <Suspense
                fallback={<div className="h-52 w-52 bg-gray-300"></div>}
                key={product?._id}
              >
                <ProductCard product={product} />
              </Suspense>
            ))}
      </div>
    </div>
  );
}

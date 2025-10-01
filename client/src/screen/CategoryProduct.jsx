import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../redux/slice/category-slice";
import useAddToCart from "../helpers/useAddToCart";

export default function CategoryProduct() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);

  const [sortOption, setSortOption] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryName) {
      const categoryArray = categoryName.split(",");
      setSelectedCategories(categoryArray);
      dispatch(fetchCategory(categoryArray));
    }
  }, [categoryName, dispatch]);

  const handleSort = (option) => {
    setSortOption(option);
    setIsFilterOpen(false); 
  };

  const handleCategorySelection = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category];
      navigate(`/category/${updatedCategories.join(",") || ""}`);
      return updatedCategories;
    });
  };

  const filteredProducts = categoryName
    ? categories.filter(
        (product) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.productCategory)
      )
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "lowToHigh") return a.salesPrice - b.salesPrice;
    if (sortOption === "highToLow") return b.salesPrice - a.salesPrice;
    return 0;
  });

  const categoryList = [
    "Mouse",
    "Airpodes",
    "Camera",
    "Earphones",
    "Mobiles",
    "Printers",
    "Processor",
    "Refrigerator",
    "Speakers",
    "TV",
    "Trimmers",
    "Watches",
  ];

  const addToCart = useAddToCart();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-6 px-3 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Explore Products
          </h1>
          <button
            className="sm:hidden mt-3 bg-teal-500 text-white px-4 py-1.5 rounded-full shadow-lg hover:bg-teal-600 transition text-sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {isFilterOpen ? "Close" : "Filter & Sort"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters (Sidebar on Desktop, Modal on Mobile) */}
          <div
            className={`${
              isFilterOpen
                ? "fixed inset-0 z-50 bg-white p-4 overflow-y-auto"
                : "hidden"
            } lg:static lg:block lg:w-72 lg:bg-transparent lg:p-0`}
          >
            <div className="lg:bg-white lg:rounded-2xl lg:shadow-lg lg:p-6 h-full lg:h-fit">
              {/* Mobile Filter Header */}
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                <button
                  className="text-gray-600 hover:text-gray-800 text-xl"
                  onClick={() => setIsFilterOpen(false)}
                >
                  ✕
                </button>
              </div>

              {/* Sort Options */}
              <div className="mb-5">
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Sort By
                </h3>
                <select
                  value={sortOption}
                  onChange={(e) => handleSort(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Default</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>

              {/* Category Filters */}
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Categories
                </h3>
                <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                  {categoryList.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(item)}
                        onChange={() => handleCategorySelection(item)}
                        className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700 hover:text-teal-600 transition">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-bold text-teal-600">
                  {sortedProducts.length}
                </span>{" "}
                products
              </p>
            </div>

            {loading ? (
              <div className="text-center text-gray-500 animate-pulse text-sm">
                Loading products...
              </div>
            ) : error ? (
              <div className="text-center text-red-500 bg-red-50 p-3 rounded-lg text-sm">
                Oops! {error}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
                  >
                    <Link to={`/product/${product._id}`}>
                      <div className="relative h-48 sm:h-64">
                        <img
                          src={product?.productImage[0]}
                          alt={product.productName}
                          className="w-full h-full object-contain rounded-t-2xl"
                          loading="lazy"
                        />
                        <span className="absolute top-1 right-1 bg-teal-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          {product.productCategory}
                        </span>
                      </div>
                    </Link>
                    <div className="p-3 sm:p-5">
                      <h2 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1">
                        {product.productName}
                      </h2>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-lg sm:text-xl font-semibold text-teal-600">
                            ${product.salesPrice}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-400 line-through">
                            ${product.productPrice}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product._id);
                          }}
                          className="bg-teal-500 cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-teal-600 transition text-xs sm:text-sm"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 bg-white p-4 rounded-2xl shadow-lg text-sm">
                No products found. Try adjusting your filters!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

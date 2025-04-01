import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countData } = useSelector((state) => state.cart);

  // Retrieve user data from localStorage
  let userData = null;
  try {
    const storedData = localStorage.getItem("loginData");
    userData = storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error parsing loginData:", error);
    localStorage.removeItem("loginData");
  }

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Your Profile
        </h1>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-full lg:w-1/3 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
            {userData?.imageUrl ? (
              <img
                src={userData.imageUrl}
                alt={userData.username || "User"}
                className="h-28 w-28 rounded-full border-4 border-indigo-100 object-cover shadow-sm"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-300 flex items-center justify-center text-4xl font-bold text-white shadow-sm">
                {userData?.username?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">
              {userData?.username || "Guest User"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {userData?.email || "No email provided"}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {userData?.phone || "No phone number"}
            </p>
            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg py-2.5 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
            >
              Logout
            </button>
          </div>

          {/* Cart & Orders Section */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Cart Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Cart</h3>
                <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {typeof countData === "number"
                    ? countData
                    : countData?.data || 0}{" "}
                  Items
                </span>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-600">Manage your shopping cart</p>
                <Link
                  to="/cart"
                  className="w-full sm:w-auto bg-indigo-600 text-white font-semibold rounded-lg py-2 px-4 hover:bg-indigo-700 transition-all duration-200 shadow-sm"
                >
                  View Cart
                </Link>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Orders</h3>
                <span className="bg-purple-100 text-purple-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  0 Orders
                </span>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-600">Track your order history</p>
                <button className="w-full sm:w-auto bg-purple-600 text-white font-semibold rounded-lg py-2 px-4 hover:bg-purple-700 transition-all duration-200 shadow-sm">
                  View Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/auth-slice";
import { getTotalOrder } from "../redux/slice/order-slice";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countData } = useSelector((state) => state.cart);
  const { totalOrders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await dispatch(logout()).unwrap();
      navigate("/");
      toast.success("Logout successful");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    dispatch(getTotalOrder());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center animate-fade-in">
          Your Profile
        </h1>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
          </div>
        )}

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full lg:w-1/3 flex flex-col items-center transform hover:shadow-2xl transition-all duration-300">
            {user.data.imageUrl ? (
              <img
                src={user.data.imageUrl}
                alt={user.data.username || "User"}
                className="h-32 w-32 rounded-full border-4 border-indigo-200 object-cover shadow-md transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="h-32 w-32 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-5xl font-bold text-white shadow-md">
                {user.data.username?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              {user.data.username || "Guest User"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {user.data.email || "No email provided"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {user.data.phone || "No phone number"}
            </p>
            {user.data.role === "admin" && (
              <Link
                to="/admin"
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg py-2.5 px-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md text-center"
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`mt-4 w-full cursor-pointer bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg py-2.5 px-4 hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>

          {/* Cart & Orders Section */}
          <div className="w-full lg:w-2/3 space-y-8">
            {/* Cart Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-800">Cart</h3>
                <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
                  {typeof countData === "number" ? countData : countData?.data || 0} Items
                </span>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-gray-600 text-lg">Manage your shopping cart</p>
                <Link
                  to="/cart"
                  className="w-full sm:w-auto bg-indigo-600 text-white font-semibold rounded-lg py-3 px-6 hover:bg-indigo-700 transition-all duration-200 shadow-md"
                >
                  View Cart
                </Link>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-800">Orders</h3>
                <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
                  {totalOrders} Orders
                </span>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-gray-600 text-lg">Track your order history</p>
                <Link
                  to="/order"
                  className="w-full sm:w-auto bg-purple-600 text-white font-semibold rounded-lg py-3 px-6 hover:bg-purple-700 transition-all duration-200 shadow-md"
                >
                  View Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
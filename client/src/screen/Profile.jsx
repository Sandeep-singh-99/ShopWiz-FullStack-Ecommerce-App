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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center animate-slide-in">
          Your Profile
        </h1>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center mb-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-500"></div>
          </div>
        )}

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transform transition-all duration-300 hover:shadow-xl">
            {user.data.imageUrl ? (
              <img
                src={user.data.imageUrl}
                alt={user.data.username || "User"}
                className="h-28 w-28 rounded-full border-4 border-indigo-100 object-cover shadow-sm transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-4xl font-bold text-white shadow-sm">
                {user.data.username?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
            <h2 className="mt-6 text-xl md:text-2xl font-semibold text-gray-800">
              {user.data.username || "Guest User"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {user.data.email || "No email provided"}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {user.data.phone || "No phone number"}
            </p>
            {user.data.role === "admin" && (
              <Link
                to="/admin"
                className="mt-6 w-full bg-indigo-600 text-white font-medium rounded-lg py-3 px-4 text-center hover:bg-indigo-700 transition-all duration-200 shadow-md"
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`mt-4 w-full bg-red-600 text-white font-medium rounded-lg py-3 px-4 hover:bg-red-700 transition-all duration-200 shadow-md ${
                isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>

          {/* Cart & Orders Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cart Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Your Cart</h3>
                <span className="bg-indigo-100 text-indigo-600 text-sm font-medium px-3 py-1 rounded-full">
                  {typeof countData === "number" ? countData : countData?.data || 0} Items
                </span>
              </div>
              <div className="mt-6 border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-base">View and manage your shopping cart</p>
                <Link
                  to="/cart"
                  className="w-full sm:w-auto bg-indigo-600 text-white font-medium rounded-lg py-2.5 px-6 hover:bg-indigo-700 transition-all duration-200 shadow-sm"
                >
                  View Cart
                </Link>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Your Orders</h3>
                <span className="bg-purple-100 text-purple-600 text-sm font-medium px-3 py-1 rounded-full">
                  {totalOrders} Orders
                </span>
              </div>
              <div className="mt-6 border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-base">Track and view your order history</p>
                <Link
                  to="/order"
                  className="w-full sm:w-auto bg-purple-600 text-white font-medium rounded-lg py-2.5 px-6 hover:bg-purple-700 transition-all duration-200 shadow-sm"
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
import React, { useEffect, useState } from 'react';
import { FiUsers, FiShoppingBag, FiFileText, FiDollarSign } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { totalUser } from '../../redux/slice/auth-slice';
import { totalProduct } from '../../redux/slice/product-slice';
import { totalAmount, totalOrder } from '../../redux/slice/order-slice';

export default function Dashboard() {
  const { totalUsers } = useSelector((state) => state.auth);
  const { totalProducts } = useSelector((state) => state.product);
  const { totalOrderAllUsers, totalOrderAmount } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await Promise.all([
          dispatch(totalUser()).unwrap(),
          dispatch(totalProduct()).unwrap(),
          dispatch(totalOrder()).unwrap(),
          dispatch(totalAmount()).unwrap(),
        ]);
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch dashboard data. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };

  }, [dispatch]);

  const stats = [
    {
      title: 'Total Users',
      value: isLoading ? 'Loading...' : error ? 'N/A' : totalUsers || 0,
      icon: <FiUsers className="w-6 h-6 text-blue-400" />,
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Total Products',
      value: isLoading ? 'Loading...' : error ? 'N/A' : totalProducts || 0,
      icon: <FiShoppingBag className="w-6 h-6 text-green-400" />,
      gradient: 'from-green-500 to-green-600',
    },
    {
      title: 'Total Orders',
      value: isLoading ? 'Loading...' : error ? 'N/A' : totalOrderAllUsers || 0,
      icon: <FiFileText className="w-6 h-6 text-yellow-400" />,
      gradient: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Total Revenue',
      value: isLoading ? 'Loading...' : error ? 'N/A' : `$${totalOrderAmount.toFixed(2)}`,
      icon: <FiDollarSign className="w-6 h-6 text-purple-400" />,
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-500 text-lg">
          Welcome back! Here's an overview of your platform.
        </p>
        {error && (
          <p className="mt-2 text-red-500 text-lg">{error}</p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                {stat.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-wide">
                  {stat.title}
                </h2>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
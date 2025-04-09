import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../redux/slice/order-slice";

export default function OrderPage() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-medium">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found.</p>
          <a
            href="/products"
            className="mt-4 inline-block bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Shop Now
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Order ID: {order.orderId}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Product
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <img
                              src={item?.productId.productImage?.[0]}
                              alt={`Product ${item.productId._id}`}
                              className="w-16 h-16 object-contain rounded-lg mr-4"
                            />
                            <span className="text-gray-700 font-medium">
                              {item.productId._id}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-gray-600">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 text-center text-gray-600">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-center text-gray-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Payment Details
                </h3>
                <p className="text-gray-600">Payment Method: Credit Card</p>
                <p className="text-gray-600">
                  Transaction ID: {order.merchantTransactionId}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

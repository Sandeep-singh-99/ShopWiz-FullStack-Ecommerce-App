// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getOrder } from '../redux/slice/order-slice'

// export default function OrderPage() {
//     const dispatch = useDispatch()

//     const { orders, loading, error } = useSelector((state) => state.order)

//     useEffect(() => {
//         dispatch(getOrder())
//     })
//   return (
//     <div>OrderPage</div>
//   )
// }




import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../redux/slice/order-slice';

export default function OrderPage() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Order Summary</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Order ID: {order.orderId}</h2>
            <p className="text-gray-600">Status: <span className="text-green-500">{order.status}</span></p>
            <p className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>

            <div className="overflow-x-auto mt-6">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Product</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Quantity</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Price</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <img
                            src={item?.productId.productImage?.[0]} 
                            alt={`Product ${item.productId._id}`} 
                            className="w-12 h-12 object-cover rounded-md mr-4"
                          />
                          <span className="text-gray-700">{item.productId._id}</span> 
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">{item.quantity}</td>
                      <td className="px-4 py-2 text-center">${item.price}</td>
                      <td className="px-4 py-2 text-center">${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between">
              <span className="text-xl font-semibold text-gray-800">Total Amount</span>
              <span className="text-xl font-semibold text-gray-800">${order.totalAmount}</span>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-700">Payment Details</h2>
              <p className="text-gray-600">Payment Method: Credit Card</p>
              <p className="text-gray-600">Transaction ID: {order.merchantTransactionId}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

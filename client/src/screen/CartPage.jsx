import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  countCartProduct,
  deleteCartProduct,
  getToCart,
  updateToCartProduct,
} from "../redux/slice/cart-slice";
import PhonePePaymentModal from "../components/PhonePePaymentModal";
import PhonePePaymentButton from "../components/PhonePePaymentButton";


export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);

  const handleDelete = async (id) => {
    try {
      const resultAction = await dispatch(deleteCartProduct(id));
      if (deleteCartProduct.fulfilled.match(resultAction)) {
        toast.success("Item removed from cart");
        await dispatch(countCartProduct());
      } else {
        throw new Error(resultAction.requestStatus || "Failed to delete item");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    try {
      const resultAction = await dispatch(
        updateToCartProduct({ _id: id, quantity })
      );
      if (updateToCartProduct.fulfilled.match(resultAction)) {
        toast.success("Cart updated successfully");
        dispatch(getToCart());
      } else {
        throw new Error(resultAction.requestStatus || "Failed to update cart");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getToCart());
      dispatch(countCartProduct());
    } else {
      toast.error("Please login to continue");
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, dispatch, navigate]);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productId?.salesPrice * item.quantity,
    0
  );

  const handlePaymentStart = (url) => {
    setRedirectUrl(url);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={item.productId?.productImage[0]}
                    alt={item.productId?.productName}
                    className="w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-md border border-gray-200 bg-gray-50"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {item.productId?.productName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {item.productId?.productBrand}
                      </p>
                      <p className="text-lg font-bold text-indigo-600 mt-2">
                        ₹{item.productId?.salesPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>In stock</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <select
                      className="border border-gray-300 rounded-md p-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value))
                      }
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-6 w-full">
                <PhonePePaymentButton
                    amount={subtotal}
                    cartItems={cartItems}
                    onPaymentStart={handlePaymentStart}
                    disabled={cartItems.length === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <PhonePePaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        redirectUrl={redirectUrl}
      />
    </div>
  );
}
import { useDispatch } from "react-redux";
import { addCart, countCartProduct } from "../redux/slice/cart-slice";
import toast from "react-hot-toast";

const useAddToCart = () => {
  const dispatch = useDispatch();
  

  const addToCart = async (id) => {
    const response = await dispatch(addCart(id));
    console.log("Add to Cart Response:", response);
    if (response.type === addCart.fulfilled.type) {
      dispatch(countCartProduct());
      toast.success(response.payload?.message || "Product added to cart!");
    } else {
        toast.error(response.payload?.message || "Failed to add product to cart.");
    }
  };

  return addToCart;
};

export default useAddToCart;

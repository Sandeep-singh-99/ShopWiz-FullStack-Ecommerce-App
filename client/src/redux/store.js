import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { persistStore, persistReducer } from "redux-persist";
import authSlice from "./slice/auth-slice";
import cartSlice from "./slice/cart-slice";
import productSlice from "./slice/product-slice";
import categorySlice from "./slice/category-slice";
import commentSlice from "./slice/comment-slice";
import orderSlice from "./slice/order-slice";

const persistConfig = {
  key: "root",  
  storage,     
  whitelist: ["auth", "cart"], 
};


const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  product: productSlice,
  category: categorySlice,
  comment: commentSlice,
  order: orderSlice,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store);
export default store;

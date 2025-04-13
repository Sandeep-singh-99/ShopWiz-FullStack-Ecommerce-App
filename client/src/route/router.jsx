import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../screen/Home";
import Login from "../components/Login";
import Register from "../components/SignUp";
import Profile from "../screen/Profile";
import AdminLogin from "../screen/admin/AdminLogin";
import AdminHome from "../screen/admin/AdminHome";
import Product from "../screen/admin/Product";
import CategoryProduct from "../screen/CategoryProduct";
import ProductDetails from "../screen/ProductDetails";
import CartPage from "../screen/CartPage";
import StatusPage from "../screen/StatusPage";
import PaymentSuccess from "../screen/PaymentSuccess";
import PaymentFailed from "../screen/PaymentFailed";
import OrderPage from "../screen/OrderPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "profile",
                element: <Profile/>
            },

            {
                path: "category/:categoryName",
                element: <CategoryProduct/>
            },
            {
                path: "product/:id",
                element: <ProductDetails/>
            },
            {
                path: "cart",
                element: <CartPage/>
            },
            {
                path: '/status/:merchantTransactionId',
                element: <StatusPage/>
            },
            {
                path: 'status',
                element: <StatusPage/>
            },
            {
                path: "payment-success",
                element: <PaymentSuccess/>
            },
            {
                path: "payment-failed",
                element: <PaymentFailed/>
            },
            {
                path: "order",
                element: <OrderPage/>
            }
        ],
    },

    {
        path: "admin-login",
        element: <AdminLogin/>
    },

    {
        path: "admin",
        element: <AdminHome/>,
        children: [
            {
                path: "product",
                element: <Product/>
            },
        ]
    }
])

export default router;
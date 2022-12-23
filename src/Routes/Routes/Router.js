import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import AllBuyers from "../../Pages/Dashboard/Admin/AllBuyers";
import AllSellers from "../../Pages/Dashboard/Admin/AllSellers";
import ReportedItems from "../../Pages/Dashboard/Admin/ReportedItems";
import MyOrder from "../../Pages/Dashboard/Buyer/MyOrder";
import Payment from "../../Pages/Dashboard/Buyer/Payment";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import AddProducts from "../../Pages/Dashboard/Seller/AddProducts";
import MyProducts from "../../Pages/Dashboard/Seller/MyProducts";
import CarCategories from "../../Pages/Home/Categories/Category/CarCategories";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoutes from "./Role Routes/AdminRoutes";
import BuyerRoutes from "./Role Routes/BuyerRoutes";
import SellerRoutes from "./Role Routes/SellerRoutes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/category/:category_name',
                loader: ({ params }) => fetch(`http://localhost:5000/all-cars/${params.category_name}`),
                element: <PrivateRoute><CarCategories></CarCategories></PrivateRoute>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>,
            },
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
            },
            {
                path: '/dashboard/my-orders',
                element: <BuyerRoutes><MyOrder></MyOrder></BuyerRoutes>,
            },
            {
                path: '/dashboard/add-product',
                element: <SellerRoutes><AddProducts></AddProducts></SellerRoutes>,
            },
            {
                path: '/dashboard/my-products',
                element: <SellerRoutes><MyProducts></MyProducts></SellerRoutes>,
            },
            {
                path: '/dashboard/all-buyers',
                element: <AdminRoutes><AllBuyers></AllBuyers></AdminRoutes>,
            },
            {
                path: '/dashboard/all-sellers',
                element: <AdminRoutes><AllSellers></AllSellers></AdminRoutes>,
            },
            {
                path: '/dashboard/reported-items',
                element: <AdminRoutes><ReportedItems></ReportedItems></AdminRoutes>,
            },
            {
                path: '/dashboard/payment/:booking_id',
                loader: ({ params }) => fetch(`http://localhost:5000/booking/${params.booking_id}`),
                element: <BuyerRoutes><Payment></Payment></BuyerRoutes>
            }
        ]
    }
])

export default router;
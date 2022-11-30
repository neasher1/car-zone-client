import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AllBuyers from "../../Pages/Dashboard/Admin/AllBuyers";
import AllSellers from "../../Pages/Dashboard/Admin/AllSellers";
import ReportedItems from "../../Pages/Dashboard/Admin/ReportedItems";
import MyOrder from "../../Pages/Dashboard/Buyer/MyOrder";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import AddProducts from "../../Pages/Dashboard/Seller/AddProducts";
import MyProducts from "../../Pages/Dashboard/Seller/MyProducts";
import CarCategories from "../../Pages/Home/Categories/Category/CarCategories";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
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
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
        // errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
            },
            {
                path: '/dashboard/my-orders',
                element: <MyOrder></MyOrder>,
            },
            {
                path: '/dashboard/add-product',
                element: <AddProducts></AddProducts>,
            },
            {
                path: '/dashboard/my-products',
                element: <MyProducts></MyProducts>,
            },
            {
                path: '/dashboard/all-buyers',
                element: <AllBuyers></AllBuyers>,
            },
            {
                path: '/dashboard/all-sellers',
                element: <AllSellers></AllSellers>,
            },
            {
                path: '/dashboard/reported-items',
                element: <ReportedItems></ReportedItems>,
            },
        ]
    }
])

export default router;
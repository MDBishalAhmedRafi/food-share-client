import {
  createBrowserRouter,
  RouterProvider
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AvailableFoods from '../Pages/AvailableFoods'
import AddFood from '../Pages/AddFood'
import ManageMyFoods from '../Pages/ManageMyFoods'
import MyFoodsRequest from "../Pages/MyFoodsRequest";
import Login from '../Pages/Login'
import Register from '../Pages/Register'


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <div>Error Page</div>,
    children: [ 
                { 
                                index: true,
                                path: '/',
                                element: <Home></Home>,
                },
                { 
                                path: '/available-foods',
                                element: <AvailableFoods></AvailableFoods>,
                },
                { 
                                path: '/add-foods',
                                element: <AddFood></AddFood>,
                },
                { 
                                path: '/manage-my-foods',
                                element: <ManageMyFoods></ManageMyFoods>,
                },
                { 
                                path: '/my-food-request',
                                element: <MyFoodsRequest></MyFoodsRequest>,
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
]);

export default router;


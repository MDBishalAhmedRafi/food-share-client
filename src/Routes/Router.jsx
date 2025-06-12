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
import ForgetPass from "../Pages/ForgetPass";
import Loading from "../Pages/Loading";
import PrivateRoute from "../Provider/PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <div>Error Page</div>,
    children: [ 
                { 
                                index: true,
                                path: '/',
                                loader: () => fetch('http://localhost:3000/foods'),
                                element: <Home></Home>,
                                hydrateFallbackElement: <Loading></Loading>
                },
                { 
                                path: '/available-foods',
                                loader: () => fetch('http://localhost:3000/available-foods'),
                                element: <AvailableFoods></AvailableFoods>,
                },
                { 
                                path: '/add-foods',
                                element: <PrivateRoute>
                                  <AddFood></AddFood>
                                </PrivateRoute>,
                },
                { 
                                path: '/manage-my-foods',
                                element: <PrivateRoute>
                                  <ManageMyFoods></ManageMyFoods>
                                </PrivateRoute>,
                },
                { 
                                path: '/my-food-request',
                                element: <PrivateRoute>
                                  <MyFoodsRequest></MyFoodsRequest>
                                </PrivateRoute>,
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
                                path: '/forget-password',
                                element: <ForgetPass></ForgetPass>,
                },
    ]
  },
]);

export default router;


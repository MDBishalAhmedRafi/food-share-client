import {
  createBrowserRouter,
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
import FoodDetails from "../Pages/FoodDetails";
import ErrorPage from "../Pages/ErrorPage"


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [ 
                { 
                                index: true,
                                path: '/',
                                // loader: () => fetch('https://food-sharing-server-coral.vercel.app/foods'),
                                element: <Home></Home>,
                                hydrateFallbackElement: <Loading></Loading>
                },
                { 
                                path: '/available-foods',
                                loader: ({params, context, request}) => { 
                                  console.log(params, context, request)
                                  return fetch(`https://food-sharing-server-coral.vercel.app/available-foods${request.url.includes('desc') ? '?sort=desc':request.url.includes('asc') ? '?sort=asc': ''}`)
                                },
                                element: <AvailableFoods></AvailableFoods>,
                                hydrateFallbackElement: <Loading></Loading>,
                },
                { 
                                path: '/foods/:id',
                                element: <PrivateRoute>
                                  <FoodDetails></FoodDetails>
                                </PrivateRoute>,
                                hydrateFallbackElement: <Loading></Loading>,
                                // loader: ({params}) => fetch (`https://food-sharing-server-coral.vercel.app/foods/${params.id}`)
                },
                { 
                                path: '/add-foods',
                                element: <PrivateRoute>
                                  <AddFood></AddFood>
                                </PrivateRoute>,
                },
                { 
                                path: '/manage-my-foods/:email',
                                // loader: ({params}) => fetch(`https://food-sharing-server-coral.vercel.app/my-foods/${params?.email}`),
                                element: <PrivateRoute>
                                  <ManageMyFoods></ManageMyFoods>
                                </PrivateRoute>,
                                hydrateFallbackElement: <Loading></Loading>,
                },
                { 
                                path: '/my-food-request',
                                element: <PrivateRoute>
                                  <MyFoodsRequest></MyFoodsRequest>
                                </PrivateRoute>,
                                hydrateFallbackElement: <Loading></Loading>,
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


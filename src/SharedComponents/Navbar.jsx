import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import mainLogo from '../assets/logo.jpg';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import ToggleTheme from './ToggleTheme';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.warn("User has Logged Out", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(() => {});
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#2A9D8F] via-orange to-[#F1FAEE]">
      <div className="navbar shadow-sm mb-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/available-foods">Available-Foods</NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/add-foods">Add-Foods</NavLink>
                  </li>
                  <li>
                    <NavLink to={`/manage-my-foods/${user?.email}`}>Manage My Foods</NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-food-request">My Food Request</NavLink>
                  </li>
                 <button onClick={handleLogOut} className="btn bg-[#2A9D8F] lg:hidden block">
              Logout
            </button>
                </>
              )}
            </ul>
          </div>

          <Link to="/">
            <h1 className="font-bold text-gray-600">FoodShare</h1>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex dark:text-gray-900">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/available-foods">Available-Foods</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/add-foods">Add-Foods</NavLink>
                </li>
                <li>
                  <NavLink to={`/manage-my-foods/${user?.email}`}>Manage My Foods</NavLink>
                </li>
                <li>
                  <NavLink to="/my-food-request">My Food Request</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="navbar-end space-x-3">
          <ToggleTheme />
          {user && user.photoURL && (
            <img
              className="bg-green-200 rounded-full p-1 w-10 h-10 object-cover"
              src={user.photoURL}
              alt="User"
            />
          )}
          {user ? (
            <button onClick={handleLogOut} className="btn bg-[#2A9D8F] lg:block hidden">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn bg-[#2A9D8F]">
                Login
              </Link>
              <Link to="/register" className="btn bg-[#2A9D8F]">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

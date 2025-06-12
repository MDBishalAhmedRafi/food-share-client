import React, { use, useRef } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const ForgetPass = () => {
  const location = useLocation();
  // console.log(location)
  const { forgetPass } = use(AuthContext);

  const emailRef = useRef();
  const handleForgetPass = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    // console.log(email)
    forgetPass(email)
      .then(() => {
        toast.success("Please Check Your Email to Reset password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // window.location.href =
        //   "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox";
        // // ..

        window.open('https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox', '_blank');
      })
      .catch(() => {
        toast.warn("There is a problem with reset password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // ..
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F1FAEE] via-orange to-[#2A9D8F] lg:w-11/12 lg:mx-auto mx-s rounded-2xl px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 via-green-400 to-red-500 bg-clip-text text-transparent">
          Forgot Password
        </h2>

        <form onSubmit={handleForgetPass}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            ref={emailRef}
            defaultValue={location.state.email}
            className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
            placeholder="you@example.com"
          />

          <button
            type="submit"
            className="w-full bg-[#2A9D8F90] text-white font-bold py-2 rounded-lg hover:bg-[#2A9D8F] cursor-pointer transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;

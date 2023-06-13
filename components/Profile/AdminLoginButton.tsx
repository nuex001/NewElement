import axios from "axios";
import Router from "next/router";
import React from "react";

type Props = {
  authedProfile: any;
};

const AdminLoginButton = ({ authedProfile }: Props) => {
  const loginAddress = (e: any) => {
    e.preventDefault();
    const address = authedProfile.address;
    axios
      .post(`/api/adminSignIn`, { address: address })
      .then(function (response) {
        // const { username } = response.data;
        Router.push("/admin");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  return (
    <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true" />

      <div>
        <button
          onClick={loginAddress}
          type="submit"
          className="group relative flex w-full md:w-[24%] justify-center rounded-md border border-transparent bg-green py-2 px-4 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Admin Sign In
        </button>
      </div>
    </form>
  );
};

export default AdminLoginButton;

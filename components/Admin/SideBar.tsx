import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

const SideBar = (props: Props) => {
  const [userData, setUserData] = useState("");
  const [requests, setRequests] = useState("");

  //  const getUserData = () => {
  //    axios.get("/api/users").then((response) => {
  //      let users = response.data;

  //      users.map((item) => {
  //        if (item.username === username) {
  //          let { appointments } = item;
  //          setUserData(appointments);
  //        }
  //      });
  //    });
  //  };
  //  const getRequests = () => {
  //    axios.get("/api/requests").then((response) => {
  //      setRequests(response.data);
  //    });
  //  };
  //  useEffect(() => {
  //    getUserData();
  //    getRequests();
  //  }, []);
  // getUserData();
  // getRequests();
  const router = useRouter();
  const logOut = () => {
    axios.delete("/api/adminSignIn").then((res) => {
      router.push("/");
    });
  };
  return (
    <div className=" flex flex-col flex-auto font-ibmPlex  flex-shrink-0 antialiased bg-transparent text-gray-800">
      <div className="fixed flex  z-0  flex-col top-0 left-0 w-64 bg-transparent mt-24 h-full border-r">
        <div className="overflow-y-auto mt-14 overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-200">
                  Tasks
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/admin/whitelist"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-gray-200  border-l-4 border-transparent hover:border-green pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide  truncate">
                  Whitelist Users
                </span>
              </Link>
            </li>

            <li className="px-5">
              <div className="flex flex-row items-center h-8 mt-10">
                <div className="text-sm font-light tracking-wide text-gray-200">
                  Settings
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/admin/registration"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-gray-200  border-l-4 border-transparent hover:border-green pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Register admin
                </span>
              </Link>
            </li>
            <li>
              <button
                onClick={logOut}
                className="relative flex flex-row items-center w-full h-11 focus:outline-none hover:bg-gray-600 text-gray-200  border-l-4 border-transparent hover:border-green pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

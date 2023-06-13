import React, { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";
import ButtonSpinner from "../LoadingSkeletons/ButtonSpinner";

type Props = {
  user: any;
  admins: any;
};

const RegistrationComponents = ({ user, admins }: Props) => {
  const [userAddress, setUserAddress] = useState("");
  const [isErrorAddress, setIsErrorAddress] = useState(null) as any;
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteAdmin, setDeleteAdmin] = useState(null as any);

  const { superAdmin } = user;

  let newAdminList: any[] = [];

  const handleChange = (e: any) => {
    e.preventDefault();
    setUserAddress(e.target.value);
  };
  // Rehydrate data from server
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/registerAdmin", { address: userAddress })
      .then((res) => {
        console.log(res);
        refreshData();
      })
      .catch((err) => {
        if (err.response.status == 400) {
          alert("User not found");
        }
      })
      .finally(() => {
        setUserAddress("");
        setLoading(false);
      });
  };
  const handleDeleteModal = (e: any, admin: any) => {
    e.preventDefault();

    setDeleteAdmin(admin);
    setShowModal(true);
  };
  const handleDeleteArtist = (e: any, userAddress: string) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/deleteAdmin", { address: userAddress })
      .then((res) => {
        console.log(res);
        refreshData();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowModal(false);
        setLoading(false);
      });
  };
  return (
    <div className="md:w-auto w-full md:ml-64">
      <div className="flex min-h-full md:w-screen font-ibmPlex  md:mt-20 items-center justify-center mx-12 md:mx-0 py-5 md:py-12  md:px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-200">
              {!superAdmin ? "Not Authorised" : "Admin Sign Up"}
            </h2>
          </div>
          {!superAdmin ? (
            <div></div>
          ) : (
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
              action="#"
              method="POST"
            >
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="userAddress" className="sr-only">
                    User Address
                  </label>
                  <input
                    value={userAddress}
                    name="userAddress"
                    type="text"
                    required
                    className="relative block w-full min-w-[300px] appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Wallet Address"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                  Register
                </button>{" "}
              </div>{" "}
            </form>
          )}
        </div>{" "}
      </div>{" "}
      <div className="flex flex-wrap min-h-full  items-center font-ibmPlex justify-center py-12 px-4 sm:px-6 lg:px-8">
        {!loading ? (
          admins.map((admin: any, i: any) => (
            <div key={i}>
              <button
                className="bg-transparent text-white active:bg-gray-600 hover:bg-gray-700 font-bold uppercase text-xs md:text-sm  rounded shadow hover:shadow-lg outline-none w-full md:w-auto focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => handleDeleteModal(e, admin)}
              >
                <div className=" px-4 py-2 border m-1 rounded-xl " key={i}>
                  <p>Username: {admin.username ? admin.username : "N/A"}</p>
                  <p className="md:hidden">
                    {admin.address
                      .slice(0, 6)
                      .concat("...")
                      .concat(admin.address.slice(-4))}
                  </p>
                  <p className="hidden md:block">{admin.address}</p>
                  <p>admin :{admin.admin ? " Yes" : " No"}</p>
                </div>
              </button>
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto md:ml-52 fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold text-gray-600">
                            Delete admin Rank
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            Are you sure you want to delete admin rank for{" "}
                            {admin.username ? admin.username : "user"}?
                          </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={(e) => handleDeleteArtist(e, deleteAdmin)}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>
          ))
        ) : (
          <ButtonSpinner />
        )}
      </div>
    </div>
  );
};

export default RegistrationComponents;

import axios from "axios";
import router from "next/router";
import React, { useState, Fragment } from "react";
import ButtonSpinner from "../LoadingSkeletons/ButtonSpinner";

type Props = {
  user: any;
  artists: any;
};

const WhitelistComponent = ({ user, artists }: Props) => {
  const [userAddress, setUserAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = React.useState(false);

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
      .post("/api/whitelistUser", { address: userAddress })
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
  const handleDeleteArtist = (e: any, userAddress: string) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/deleteArtist", { address: userAddress })
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
    <div className="ml-64">
      <div className="flex min-h-full w-screen font-ibmPlex  mt-20 items-center justify-center py-12  px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-200">
              Whitelist User
            </h2>
          </div>

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
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-green py-2 px-4 text-sm font-medium text-gray-800  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
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
                Whitelist
              </button>{" "}
            </div>{" "}
          </form>
        </div>{" "}
      </div>{" "}
      <div className="flex flex-wrap min-h-full items-center font-ibmPlex justify-center py-12 px-4 sm:px-6 lg:px-8">
        {!loading ? (
          artists.map((artist: any, i: any) => (
            <>
              <button
                className="bg-transparent text-white active:bg-gray-600 hover:bg-gray-700 font-bold uppercase text-sm  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
              >
                <div className=" px-4 py-2 border m-1 rounded-xl " key={i}>
                  <p>Username: {artist.username ? artist.username : "N/A"}</p>
                  <p>{artist.address}</p>
                  <p>artist :{artist.isArtist ? " Yes" : " No"}</p>
                </div>
              </button>
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto ml-52 fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold text-gray-600">
                            Delete Artist Rank
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
                            Are you sure you want to delete Artist rank for{" "}
                            {artist.username ? artist.username : "user"}?
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
                            onClick={(e) =>
                              handleDeleteArtist(e, artist.address)
                            }
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
            </>
          ))
        ) : (
          <ButtonSpinner />
        )}
      </div>
    </div>
  );
};

export default WhitelistComponent;

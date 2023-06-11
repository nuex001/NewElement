import React, { useState } from "react";
import axios from "axios";
import { useAuthedProfile } from "../../context/UserContext";

type Props = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  authedProfile: any;
};

const Username = ({ loading, setLoading, authedProfile }: Props) => {
  const [username, setUsername] = React.useState<any>({
    username: "",
    open: false,
  });

  const { setAuthedProfile } = useAuthedProfile();

  //Username change

  const handleUsernameCancel = () => {
    setUsername({
      ...username,
      username: "",
      open: false,
    });
  };
  const handleUsernameOpen = () => {
    setUsername({
      ...username,
      open: true,
    });
  };

  const handleUsernameChange = (e: any) => {
    setUsername({
      ...username,
      username: e.target.value,
    });
    console.log(username);
  };
  const handleUsernameSave = () => {
    setLoading(true);
    setUsername({
      ...username,
      username: "",
      open: false,
    });
    axios
      .post("/api/updateProfile", {
        address: authedProfile.address,
        username: username.username,
      })
      .then((response) => {
        setAuthedProfile(response.data);
        console.log(response);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <label
        className={` w-fit px-1 border border-transparent
        ${username.open ? null : ` hover:border-green cursor-pointer`} `}
        htmlFor="input-username"
        onClick={handleUsernameOpen}
      >
        {authedProfile ? (
          authedProfile?.username !== "" ? (
            <h1 className="text-2xl mb-1 font-bold">
              {" "}
              {authedProfile?.username}
            </h1>
          ) : (
            <h1 className="text-2xl mb-1 font-bold">JOH KANE</h1>
          )
        ) : (
          <h1 className="text-2xl mb-3 font-bold">JOH KANE</h1>
        )}
      </label>
      {username.open && (
        <div className="flex flex-col items-start w-1/4 min-w-[220px]">
          <input
            id="input-username"
            className="text-green  w-full bg-black font-bold border border-green  p-1 mt-1 mb-2  bg-opacity-20 hover:bg-opacity-40 focus:outline-none text-2xl "
            type="text"
            accept="text"
            value={username.username}
            onChange={handleUsernameChange}
          />

          <>
            <div className="flex w-full justify-around mb-2">
              <button
                className=" text-green font-compressed uppercase border border-green tracking-[6px] w-full px-1 text-xl my-1 mr-2 bg-white bg-opacity-20 hover:bg-opacity-40 font-semibold "
                onClick={handleUsernameSave}
              >
                Save
              </button>
              <button
                className=" text-green font-xxCompressed uppercase border border-green tracking-[6px] w-full px-1 text-xl my-1 bg-white bg-opacity-20 hover:bg-opacity-40 font-semibold "
                onClick={handleUsernameCancel}
              >
                Cancel
              </button>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default Username;

import React from "react";
import useAuthedProfile from "../../context/UserContext";

type Props = {};

const Admin = (props: Props) => {
  const { authedProfile } = useAuthedProfile();
  console.log(authedProfile);
  const username = authedProfile?.username;
  const address = authedProfile?.address
    .slice(0, 6)
    .concat("...")
    .concat(authedProfile?.address.slice(-4));
  return (
    <div className="ml-64 overflow-hidden">
      <div className="w-full flex flex-col text-3xl font-carbon tracking-wide uppercase items-center mt-28">
        <h1 className="pt-4">Welcome to Admin Panel</h1>
        <h1 className="pt-5 text-3xl font-ibmPlex mt-10">
          {username ? username : address}
        </h1>
      </div>
    </div>
  );
};

export default Admin;

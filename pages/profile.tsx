import React from "react";
import ProfileComponent from "../components/Profile/ProfileComponent";
import { getCookie } from "cookies-next";
import connectDB from "../lib/connectDB";
import Users from "../model/users";

type Props = {
  user: any;
};

const Profile = ({ user }: Props) => {
  return <ProfileComponent />;
};
export const getServerSideProps = async ({ req, res }: any) => {
  let auth = getCookie("auth", { req, res });
  await connectDB();
  const json = await Users.findOne({ address: auth });
  let user = JSON.parse(JSON.stringify(json));
  if (!auth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { user },
    };
  }
};

export default Profile;

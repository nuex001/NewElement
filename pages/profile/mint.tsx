import React from "react";
import MintComponent from "../../components/Mint/MintComponent";

import { getCookie } from "cookies-next";
import useAuthedProfile from "../../context/UserContext";
import Users from "../../model/users";
import connectDB from "../../lib/connectDB";

type Props = {
  user: any;
};

const Mint = ({ user }: Props) => {
  const { setAuthedProfile, authedProfile } = useAuthedProfile();
  React.useEffect(() => {
    setAuthedProfile(user);
  }, [user]);
  return <MintComponent user={user} />;
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
export default Mint;

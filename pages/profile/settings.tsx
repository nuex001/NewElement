import React from "react";
import ProfileSettings from "../../components/Header/ProfileSettings";

import { getCookie } from "cookies-next";

type Props = {};

const Settings = (props: Props) => {
  return <ProfileSettings />;
};
export const getServerSideProps = async ({ req, res }: any) => {
  let auth = getCookie("auth", { req, res });

  if (!auth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { auth },
    };
  }
};
export default Settings;

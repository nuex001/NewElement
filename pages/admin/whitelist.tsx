import { getCookie } from "cookies-next";
import React from "react";
import Users from "../../model/users";
import SideBar from "../../components/Admin/SideBar";

import WhitelistComponent from "../../components/Admin/WhitelistComponent";

type Props = {
  user: any;
  artists: any;
};

const WhitelistPage = ({ user, artists }: Props) => {
  return (
    <>
      <SideBar />
      <WhitelistComponent user={user} artists={artists} />
    </>
  );
};
export const getServerSideProps = async ({ req, res }: any) => {
  let auth = getCookie("admin", { req, res });
  const json = await Users.findOne({ address: auth });
  let user = JSON.parse(JSON.stringify(json));
  const artistsJson = await Users.find({ isArtist: true });
  let artists = JSON.parse(JSON.stringify(artistsJson));
  if (!auth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { user, artists },
    };
  }
};
export default WhitelistPage;

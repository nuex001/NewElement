import React from "react";
import Admin from "../components/Admin/Admin";
import SideBar from "../components/Admin/SideBar";
import { getCookie } from "cookies-next";

type Props = {};

const AdminPage = (props: Props) => {
  return (
    <>
      <SideBar />
      <Admin />
    </>
  );
};
export const getServerSideProps = async ({ req, res }: any) => {
  let admin = getCookie("admin", { req, res });

  if (!admin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
export default AdminPage;

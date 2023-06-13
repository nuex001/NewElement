import React from "react";
import RegistrationComponent from "../../components/Admin/RegistrationComponent";
import SideBar from "../../components/Admin/SideBar";
import { getCookie } from "cookies-next";
import Users from "../../model/users";

type Props = {
  user: any;
  admins: any;
};

const Registration = ({ user, admins }: Props) => {
  return (
    <>
      <SideBar />
      <RegistrationComponent user={user} admins={admins} />
    </>
  );
};
export const getServerSideProps = async ({ req, res }: any) => {
  let auth = getCookie("admin", { req, res });
  const json = await Users.findOne({ address: auth });
  let user = JSON.parse(JSON.stringify(json));
  const adminsJson = await Users.find({ admin: true });
  let admins = JSON.parse(JSON.stringify(adminsJson));
  if (!auth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { user, admins },
    };
  }
};
export default Registration;

import React from "react";
import MintComponent from "../../components/Mint/MintComponent";

import { getCookie } from "cookies-next";

type Props = {};

const Mint = (props: Props) => {
  return <MintComponent />;
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
export default Mint;

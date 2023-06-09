import React, { useEffect } from "react";
import MintComponent from "../../components/Mint/MintComponent";
import { useAuthedProfile } from "../../context/UserContext";
import { useRouter } from "next/router";

type Props = {};

const mint = (props: Props) => {
  const router = useRouter();
  const { setAuthedProfile, authedProfile, loading } = useAuthedProfile();
  useEffect(() => {
    if (!loading) {
      if (!authedProfile) {
        router.push("/");
      }
    }
  }, [router, authedProfile]);
  // if (!authedProfile) return null;
  return <MintComponent />;
};

export default mint;

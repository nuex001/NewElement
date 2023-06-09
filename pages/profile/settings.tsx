import React, { useEffect } from "react";
import Settings from "../../components/Header/Settings";
import { useAuthedProfile } from "../../context/UserContext";
import { useRouter } from "next/router";

type Props = {};

const settings = (props: Props) => {
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

  return <Settings />;
};

export default settings;

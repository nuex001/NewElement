import React, { useEffect } from "react";
import ProfileSettings from "../../components/Header/ProfileSettings";
import { useAuthedProfile } from "../../context/UserContext";
import { useRouter } from "next/router";

type Props = {};

const Settings = (props: Props) => {
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

  return <ProfileSettings />;
};

export default Settings;

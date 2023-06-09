import React, { useEffect } from "react";
import ProfileComponent from "../components/Profile/ProfileComponent";
import { useAuthedProfile } from "../context/UserContext";
import { useRouter } from "next/router";

type Props = {};

const profile = (props: Props) => {
  const router = useRouter();
  const { setAuthedProfile, authedProfile, loading } = useAuthedProfile();
  useEffect(() => {
    console.log("1st");
  }, []);

  if (!loading && !authedProfile) {
    router.push("/");
    console.log("2nd");
  }

  console.log(authedProfile);

  if (loading) return null;
  if (!authedProfile) return null;
  console.log("3rd");

  return <ProfileComponent />;
};

export default profile;

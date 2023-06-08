import React from "react";
import ProfileComponent from "../components/Profile/ProfileComponent";
import { useAuthedProfile } from "../context/UserContext";
import { useRouter } from "next/router";

type Props = {};

const profile = (props: Props) => {
  const { setAuthedProfile, authedProfile } = useAuthedProfile();
  const router = useRouter();
  // {
  //   !authedProfile ? router.push("/") : <ProfileComponent />;
  // }
  return <ProfileComponent />;
};

export default profile;

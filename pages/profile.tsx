import React, { useEffect } from "react";
import ProfileComponent from "../components/Profile/ProfileComponent";
import { useAuthedProfile } from "../context/UserContext";
import { useRouter } from "next/router";

type Props = {};

const Profile = (props: Props) => {
  const router = useRouter();
  const { setAuthedProfile, authedProfile, loading } = useAuthedProfile();
  useEffect(() => {
    if (!authedProfile) {
      router.push("/");
    }
  }, [authedProfile]);

  if (loading) return null;
  if (!authedProfile) return null;

  return <ProfileComponent />;
};

export default Profile;

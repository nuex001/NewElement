import React from "react";
import ProfileComponent from "../components/ProfileComponent";

type Props = {};

const profile = (props: Props) => {
  return (
    <ProfileComponent cropperOpen={false} img={undefined} croppedImg={""} />
  );
};

export default profile;

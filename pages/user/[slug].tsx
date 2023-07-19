import React from "react";
import PublicProfileComponent from "../../components/PublicProfile/PublicProfileComponent";
import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
type Props = {};

const PublicProfile = ({ user }: any) => {
  console.log(user);

  return <PublicProfileComponent />;
};
export const getServerSideProps = async (pageContext: {
  query: { slug: any };
}) => {
  const pageSlug = pageContext.query.slug;

  let json = await Users.findById({ _id: pageSlug });

  let user = JSON.parse(JSON.stringify(json));
  return {
    props: {
      user,
    },
  };
};
export default PublicProfile;

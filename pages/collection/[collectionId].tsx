import React from "react";
import type { NextPage } from "next";
import CollectionListing from "../../components/Collection/CollectionListing";
import { getCookie } from "cookies-next";
import connectDB from "../../lib/connectDB";
import Users from "../../model/users";

const CollectionListingPage: NextPage = ({ user, users }: any) => {
  return <CollectionListing listing={undefined} user={user} users={users} />;
};

export const getServerSideProps = async ({ req, res }: any) => {
  let auth = getCookie("auth", { req, res });

  await connectDB();
  const json = await Users.findOne({ address: auth });
  let user = JSON.parse(JSON.stringify(json));
  const jsonUsers = await Users.find({});
  let users = JSON.parse(JSON.stringify(jsonUsers));
  return { props: { user, users } };
};

export default CollectionListingPage;

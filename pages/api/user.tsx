import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  console.log("Connected to Mongo");

  //Sign In
  if (req.method === "POST") {
    const address = "0x2E1b9630fB5b099625d45d8f7f4B382e49393394";
    Users.findOne({ address })
      .then((user) => res.send(user))
      .catch((err) => console.log(err));
  }
};

export default handler;

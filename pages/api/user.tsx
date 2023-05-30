import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  console.log("Connected to Mongo");

  //Find user by address
  // if (req.method === "POST") {
  //   const address = "0x2E1b9630fB5b099625d45d8f7f4B382e49393394";

  //   await Users.findOne({ address })
  //     .then((response) => {
  //       console.log(response);

  //       res.status(200).send(response);
  //     })
  //     .catch((err: any) => {
  //       res.status(400).send({ message: "User request failed" });
  //     });
  // } else {
  //   console.log("Wrong method");
  // }
};

export default handler;

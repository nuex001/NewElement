import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";

export const getData = async () => {
  await connectDB();

  const address = "0x2E1b9630fB5b099625d45d8f7f4B382e49393394";
  const data = await Users.findOne({ address });

  return data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getData();
  console.log(data);

  res.status(200).json(data);
};

export default handler;

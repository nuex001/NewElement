import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  console.log("Connected to Mongo");
    const address = req.body.address
    console.log(address);
    
    
  //Delete artist rank
  if (req.method === "POST") {
    await Users.findOneAndUpdate( {address} , { isArtist: false } , {new: true})
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err: any) => {
        res.status(400).send({ message: "User request failed" });
      });
  } else {
    console.log("Wrong method");
  }
};

export default handler;

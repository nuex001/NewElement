import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  console.log("Connected to Mongo");
    const address = req.body.address
    // console.log(address);
    
    
  //Whitelist user
  if (req.method === "POST") {
    await Users.findOneAndUpdate( {address} , { isArtist: true } , {new: true})
      .then((response) => {
        if(!response) {
            res.status(400).send({ message: "User not found" });
        }
        
        res.status(200).send(response);
      })
      .catch((err: any) => {
        res.status(401).send({ message: "User request failed" });
      });
  } else {
    console.log("Wrong method");
  }
};

export default handler;

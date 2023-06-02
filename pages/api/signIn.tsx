import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  console.log("Connected to Mongo");

  //Sign In
  if (req.method === "POST") {
    const { address } = req.body;

    const user = await Users.findOne({ address });

    if (!user) {
      const newUser = new Users({
        address,
        profilePicture: "",
        bannerPicture: "",
        bio: "",
        username: "",
        isArtist: true,
      });

      newUser
        .save()
        .then(() => {
          console.log("Saved successfully." + newUser);
          res.status(200).json({ message: "Registration successful" });
        })
        .catch((err: any) => {
          res.status(400).send({ message: "Saving failed" });
          console.log("Saving failed.", err);
        });
    } else {
      res.status(200).json({ message: "User already exists", user });
    }
  }
};

export default handler;

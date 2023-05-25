import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  console.log("Connected to Mongo");

  //Sign In
  if (req.method === "POST") {
    const data = req.body;
    if (!data) {
      return res.status(400).send({ message: "Bad request" });
    }
    const { imgUrl } = req.body;
    console.log(imgUrl);

    const address = "0x2E1b9630fB5b099625d45d8f7f4B382e49393394";

    await Users.findOneAndUpdate(
      { address },
      { profilePicture: imgUrl },

      {
        new: true,
      }
    )
      .then((response) => {
        console.log(response);

        res.status(200).send({ message: "Profile Updated" });
      })
      .catch((err: any) => {
        res.status(400).send({ message: "Saving failed" });
        console.log("Saving failed.", err);
      });

    // if (!user) {
    //   const newUser = new Users({
    //     address,
    //   });

    //   newUser
    //     .save()
    //     .then(() => {
    //       console.log("Saved successfully." + newUser);
    //       res.status(200).json({ message: "Registration successful" });
    //     })
    //     .catch((err: any) => {
    //       res.status(400).send({ message: "Saving failed" });
    //       console.log("Saving failed.", err);
    //     });
    // } else {
    //   res.status(200).json({ message: "User already exists" });
    // }
  } else {
    console.log("Wrong method");
  }
};

export default handler;

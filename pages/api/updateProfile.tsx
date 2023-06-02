import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  console.log("Connected to Mongo");

  //Upload profile pic
  if (req.method === "POST") {
    const data = req.body;
    if (!data) {
      return res.status(400).send({ message: "Bad request" });
    }
    const { imgUrl, bannerImgUrl, address, bio, username } = req.body;
    console.log(
      "profile pic: " + imgUrl,
      "banner pic: " + bannerImgUrl,
      "username: " + username,
      "bio :" + bio
    );

    if (imgUrl) {
      await Users.findOneAndUpdate(
        { address },
        { profilePicture: imgUrl },

        {
          new: true,
        }
      )
        .then((response) => {
          // console.log(response);

          res.status(200).send(response);
        })
        .catch((err: any) => {
          res.status(400).send({ message: "Saving failed" });
          console.log("Saving failed.", err);
        });
    } else if (bannerImgUrl) {
      await Users.findOneAndUpdate(
        { address },
        { bannerPicture: bannerImgUrl },

        {
          new: true,
        }
      )
        .then((response) => {
          // console.log(response);

          res.status(200).send(response);
        })
        .catch((err: any) => {
          res.status(400).send({ message: "Saving failed" });
          console.log("Saving failed.", err);
        });
    } else if (username) {
      await Users.findOneAndUpdate(
        { address },
        { username },

        {
          new: true,
        }
      )
        .then((response) => {
          // console.log(response);

          res.status(200).send(response);
        })
        .catch((err: any) => {
          res.status(400).send({ message: "Saving failed" });
          console.log("Saving failed.", err);
        });
    } else if (bio) {
      await Users.findOneAndUpdate(
        { address },
        { bio },

        {
          new: true,
        }
      )
        .then((response) => {
          // console.log(response);

          res.status(200).send(response);
        })
        .catch((err: any) => {
          res.status(400).send({ message: "Saving failed" });
          console.log("Saving failed.", err);
        });
    }
  } else {
    console.log("Wrong method");
  }
};

export default handler;

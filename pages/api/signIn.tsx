import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  console.log("Connected to Mongo");

  //Sign In
  if (req.method === "POST") {
    const { address, banner } = req.body;

    const user = await Users.findOne({ address });

    if (!user) {
      const newUser = new Users({
        address,
        profilePicture: "",
        bannerPicture: banner.src,
        bio: "",
        username: "",
        collections: [],
        isArtist: false,
      });

      newUser
        .save()
        .then(() => {
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("auth", address, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 3600,
              path: "/",
            })
          );
          console.log("Saved successfully." + newUser);
          res.status(200).json({ user: newUser });
        })
        .catch((err: any) => {
          res.status(400).send({ message: "Saving failed" });
          console.log("Saving failed.", err);
        });
    } else {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", address, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );
      res.status(200).json({ message: "Welcome back" });
    }
  } else if (
    //Sign out
    req.method === "DELETE"
  ) {
    res.setHeader("Set-Cookie", [
      cookie.serialize("auth", "", {
        maxAge: -1,
        path: "/",
      }),
    ]);

    return res.status(200).json({
      success: "Successfully logged out",
    });
  }
};

export default handler;

import Users from "../../model/users";
import connectDB from "../../lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  console.log("Connected to Mongo");
  if (req.method === "POST") {
    const { address } = req.body;

    const user = await Users.findOne({ address });

    if (user?.admin) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("admin", address, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );
      return res.status(200).json({ message: "Welcome back" });
    } else {
      return res.status(401).json({ message: "You are not an admin" });
    }
  } else if (
    //Sign out
    req.method === "DELETE"
  ) {
    res.setHeader("Set-Cookie", [
      cookie.serialize("admin", "", {
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

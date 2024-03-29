import express, { Request, Response } from "express";
import User from "../models/User.model";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "Firstname is required").isString(),
    check("lastName", "Lastname is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Pwd with 6 or more characters is required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) return res.status(400).json({ message: "User already exists" });
      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
      });
      return res.status(200).json({ message: "registeration successful!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;

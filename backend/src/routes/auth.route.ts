import express, { Request, Response } from "express";
const router = express.Router();
import User from "../models/User.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";

router.post(
  "/login",
  [
    check("email", "Email is required!").isEmail(),
    check("password", "Pwd with 6 or more characters is required!").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });
    try {
      const foundUser = await User.findOne({ email: req.body.email });
      if (!foundUser)
        return res.status(400).json({ message: "Invalid Credentials!" });
      const matchedPwd = bcrypt.compare(req.body.password, foundUser.password);
      if (!matchedPwd)
        return res.status(400).json({ message: "Invalid Credentials!" });

      const token = jwt.sign(
        { userId: foundUser._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.status(200).json({ userId: foundUser._id });
    } catch (err) {}
  }
);

export default router;

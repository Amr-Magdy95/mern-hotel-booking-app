import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users.route";
import authRoutes from "./routes/auth.route";

mongoose.connect(process.env.MONGO_URI as string);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "test endpoint" });
});

app.listen(7000, () => {
  console.log("Server running on localhost:7000");
});

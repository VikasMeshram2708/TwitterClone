import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

const app = express();

import Tweets from "./routes/Tweets";
import User from "./routes/User";
import cors from "cors";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello, world!",
  });
});

// api
app.use("/api", Tweets);
app.use("/api", User);

export default app;

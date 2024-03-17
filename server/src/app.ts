import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

const app = express();

// Middlewares
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

export default app;

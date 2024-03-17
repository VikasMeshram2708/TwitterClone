import express, { Request, Response } from "express";
import ConnectDb from "../Db";
import prisma from "../helpers/Prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;

    const { name, email, password } = reqBody;

    // connec to db
    ConnectDb();

    // make query to DB
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (e) {
    const err = e as Error;
    if (e instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({
        success: false,
        message: e?.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: err?.message,
    });
  }
});

router.get("/getUsers", async (req: Request, res: Response) => {
  try {
    // connect to DB
    await ConnectDb();

    const users = await prisma.user.findMany({});
    return res.status(200).json({
      success: true,
      usersFound: users,
    });
  } catch (e) {
    const err = e as Error;
    if (e instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({
        success: false,
        message: e?.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: err?.message,
    });
  }
});

export default router;

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import ConnectDb from "../Db";
import prisma from "../helpers/Prisma";


export const CreateUser = async (req: Request, res: Response) => {
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
};

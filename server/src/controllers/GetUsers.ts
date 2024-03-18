import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import ConnectDb from "../Db";
import prisma from "../helpers/Prisma";


export const GetUsers = async (req: Request, res: Response) => {
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
}
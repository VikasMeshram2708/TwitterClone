import { Request, Response } from "express";
import ConnectDb from "../Db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../helpers/Prisma";

export const ReadAllTweets = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    // connect to DB
    await ConnectDb();

    const data = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
      select: {
        tweets: true,
      },
    });

    return res.status(200).json({
      success: true,
      data,
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

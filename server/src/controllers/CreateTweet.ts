import { Request, Response } from "express";
import ConnectDb from "../Db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../helpers/Prisma";


export const CreateTweet  = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;

    const { tweet: userTweet, id: userId } = reqBody;

    // connec to db
    ConnectDb();

    // make query to DB
    await prisma.tweet.create({
      data: {
        tweet: userTweet,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Tweet Created Successfully.",
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
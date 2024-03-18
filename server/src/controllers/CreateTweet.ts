import { Request, Response } from "express";
import ConnectDb from "../Db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../helpers/Prisma";
import { TweetsSchema } from "../models/Tweets";

export const CreateTweet = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;

    const { tweet, id, imageUri } = reqBody;

    // connec to db
    ConnectDb();

    // Sanitize the incoming data
    TweetsSchema.parse({ tweet, id, imageUri });

    // Insert Data into DB
    await prisma.tweet.create({
      data: {
        tweet,
        imageUri,
        author: {
          connect: {
            id,
          },
        },
      },
    });

    // await prisma.tweet.create({
    //   data: {
    //     tweet: userTweet,
    //     author: {
    //       connect: {
    //         id: userId,
    //       },
    //     },
    //   },
    // });

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
};

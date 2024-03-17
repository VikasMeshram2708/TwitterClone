import express, { Request, Response } from "express";
import ConnectDb from "../Db";
import prisma from "../helpers/Prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const router = express.Router();

router.post("/create-tweet", async (req: Request, res: Response) => {
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
});

// READ ALL Tweets
router.get("/getAllTweets", async (req: Request, res: Response) => {
  try {
    // connect to DB
    await ConnectDb();

    const tweets = await prisma.tweet.findMany({});

    return res.status(200).json({
      success: true,
      usersFound: tweets,
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

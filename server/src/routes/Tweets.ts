import express, { Request, Response } from "express";
import ConnectDb from "../Db";
import prisma from "../helpers/Prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreateTweet } from "../controllers/CreateTweet";
import { ReadAllTweets } from "../controllers/ReadAllTweets";
import { DeleteTweet } from "../controllers/DeleteTweet";

const router = express.Router();

router.post("/create-tweet", CreateTweet);

// READ ALL Tweets
router.get("/getAllTweets/:id", ReadAllTweets);

// Deletee Single Tweet
router.delete("/delete-tweet", DeleteTweet);

export default router;

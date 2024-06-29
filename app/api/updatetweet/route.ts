import { ConnectToDb } from "@/lib/Db";
import { prismaInstance } from "@/lib/PrismaInstance";
import { TweetSchema, TweetSchemaType } from "@/models/TweetModel";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

interface incomingProps {
  tweetId: string;
  author: string;
  content: string;
  authorEmail: string;
}

export const PUT = async (request: NextRequest) => {
  try {
    const incomingData: incomingProps = await request.json();

    // Connect to DB
    await ConnectToDb();

    // insert into the DB
    const tweetData = await prismaInstance.tweet.update({
      where: {
        id: incomingData?.tweetId,
      },
      data: {
        author: incomingData?.author,
        authorEmail: incomingData?.authorEmail,
        content: incomingData?.content,
      },
    });

    // Return the Response.
    return NextResponse.json(
      {
        message: "tweet was successfully updated",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    const err = error as Error;
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: err?.message,
        },
        {
          status: 500,
        }
      );
    }
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error?.issues[0]?.message,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        message: err?.message,
      },
      {
        status: 500,
      }
    );
  }
};

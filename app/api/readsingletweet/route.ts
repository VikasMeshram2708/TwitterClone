import { ConnectToDb } from "@/lib/Db";
import { prismaInstance } from "@/lib/PrismaInstance";
import { TweetSchema, TweetSchemaType } from "@/models/TweetModel";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

interface incomingProps {
  authorId: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const incomingData: incomingProps = await request.json();

    // Connect to DB
    await ConnectToDb();

    // insert into the DB
    const tweetData = await prismaInstance.tweet.findUnique({
      where: {
        id: incomingData?.authorId,
      },
    });

    // Return the Response.
    return NextResponse.json(
      {
        data: tweetData,
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

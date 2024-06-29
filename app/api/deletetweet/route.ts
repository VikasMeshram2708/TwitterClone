import { ConnectToDb } from "@/lib/Db";
import { prismaInstance } from "@/lib/PrismaInstance";
import { TweetSchema, TweetSchemaType } from "@/models/TweetModel";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

interface incomingProps {
  tweetId: string;
}

export const DELETE = async (request: NextRequest) => {
  try {
    const incomingData: incomingProps = await request.json();

    // Connect to DB
    await ConnectToDb();

    // remove from the DB
    await prismaInstance.tweet.delete({
      where: {
        id: incomingData?.tweetId,
      },
    });

    // Return the Response.
    return NextResponse.json(
      {
        message: "tweet was successfully deleted",
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

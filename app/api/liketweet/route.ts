import { ConnectToDb } from "@/lib/Db";
import { prismaInstance } from "@/lib/PrismaInstance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

interface TweetLikeSchema {
  tweetId: string;
  liked: boolean;
}
export const POST = async (request: NextRequest) => {
  try {
    // Sanitize the incoming data
    const incomingData: TweetLikeSchema = await request.json();

    // Connect to DB
    await ConnectToDb();

    // do the business
    await prismaInstance.tweet?.update({
      where: {
        id: incomingData?.tweetId,
      },
      data: {
        liked: incomingData?.liked,
      },
    });

    // return the response
    return NextResponse.json({
      message: "Tweet liked",
    });
  } catch (error) {
    const err = error as Error;
    if (err instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: err?.message,
        },
        {
          status: 500,
        }
      );
    }
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          message: err?.issues[0]?.message,
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

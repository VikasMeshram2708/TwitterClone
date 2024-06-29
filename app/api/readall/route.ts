import { ConnectToDb } from "@/lib/Db";
import { prismaInstance } from "@/lib/PrismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    // Connect to DB
    await ConnectToDb();

    // Fetch all the recent tweets
    const allTweets = (await prismaInstance.tweet?.findMany()).reverse();

    // return the response
    return NextResponse.json(
      {
        data: allTweets,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    const err = error as Error;
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

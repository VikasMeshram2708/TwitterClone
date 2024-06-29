import { ConnectToDb } from "@/lib/Db";
import { prismaInstance } from "@/lib/PrismaInstance";
import { TweetSchema, TweetSchemaType } from "@/models/TweetModel";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const incomingData: TweetSchemaType = await request.json();
    console.log(incomingData);

    // Sanitize the incoming data
    TweetSchema.parse(incomingData);

    // Connect to DB
    await ConnectToDb();

    // insert into the DB
    await prismaInstance.tweet.create({
      data: {
        author: incomingData?.author,
        content: incomingData?.content,
        authorEmail: incomingData?.authorEmail,
      },
    });

    // Return the Response.
    return NextResponse.json(
      {
        message: "Tweet saved to DB.",
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

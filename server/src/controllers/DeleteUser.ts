import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import ConnectDb from "../Db";
import prisma from "../helpers/Prisma";
import { ZodError } from "zod";
import { DeleteUserSchema } from "../models/DeleteUser";

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;

    const { email } = reqBody;

    // Sanitize the Incoming Data
    DeleteUserSchema.parse({ email });

    // connec to db
    ConnectDb();

    // make query to DB
    await prisma.user.delete({
      where: {
        email: email,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (e) {
    const err = e as Error;
    if (e instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({
        success: false,
        message: e?.message,
      });
    }
    if (e instanceof ZodError) {
      return res.status(500).json({
        success: false,
        message: e?.errors[0]?.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: err?.message,
    });
  }
};

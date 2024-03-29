import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import ConnectDb from "../Db";
import prisma from "../helpers/Prisma";
import { UserSchema } from "../models/User";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;

    const { name, email, password } = reqBody;

    // Sanitize the Incoming Data
    UserSchema.parse({ name, email, password });

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // connec to db
    ConnectDb();

    // make query to DB
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
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

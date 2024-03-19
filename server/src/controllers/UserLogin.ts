import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { UserLoginSchema } from "../models/LoginUser";
import ConnectDb from "../Db";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";
import prisma from "../helpers/Prisma";

export const UserLogin = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const { email, password } = reqBody;

    // Sanitize the incoming data
    UserLoginSchema.parse({ email, password });

    // Connect to DB;
    await ConnectDb();

    // Query to DB
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Compare the password
    const comparePassword = await bcrypt.compare(
      password,
      user?.password as string
    );

    if (!comparePassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid Passowrd.",
      });
    }

    const userData = {
      userId: user?.id,
      name: user?.name,
      email: user?.name,
      avatar: user?.avatar,
    };

    return res.status(200).json({
      success: true,
      message: "User Logged In.",
      data: userData,
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

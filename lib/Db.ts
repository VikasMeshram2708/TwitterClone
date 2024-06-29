import { prismaInstance } from "./PrismaInstance";

export const ConnectToDb = async () => {
  try {
    await prismaInstance.$connect();
    console.log("Connected to DB successfully.");
  } catch (error) {
    console.log(`Something went wrong. Failed to connect to DB :${error}`);
  } finally {
    await prismaInstance.$disconnect();
    console.log("Connection with DB released.");
  }
};

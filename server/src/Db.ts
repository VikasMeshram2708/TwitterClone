import prisma from "./helpers/Prisma";

const ConnectDb = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to DB Successfully.");
  } catch (error) {
    console.log("Something went wrong. Failed to connect to DB.");
  } finally {
    await prisma.$disconnect();
    console.log("Connection released.");
  }
};

export default ConnectDb;

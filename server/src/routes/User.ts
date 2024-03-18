import express from "express";
import { GetUsers } from "../controllers/GetUsers";
import { CreateUser } from "../controllers/CreateUser";

const router = express.Router();

router.post("/signup", CreateUser);

router.get("/getUsers", GetUsers);

export default router;

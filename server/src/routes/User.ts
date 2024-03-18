import express from "express";
import { GetUsers } from "../controllers/GetUsers";
import { CreateUser } from "../controllers/CreateUser";
import { DeleteUser } from "../controllers/DeleteUser";

const router = express.Router();

router.post("/signup", CreateUser);

router.get("/getUsers", GetUsers);

router.delete("/delete-user", DeleteUser);

export default router;

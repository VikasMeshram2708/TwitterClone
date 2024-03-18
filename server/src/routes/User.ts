import express from "express";
import { GetUsers } from "../controllers/GetUsers";
import { CreateUser } from "../controllers/CreateUser";
import { DeleteUser } from "../controllers/DeleteUser";
import { UserLogin } from "../controllers/UserLogin";

const router = express.Router();

router.post("/signup", CreateUser);

router.get("/getUsers", GetUsers);

router.post('/login', UserLogin)

router.delete("/delete-user", DeleteUser);

export default router;

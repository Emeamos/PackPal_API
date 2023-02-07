
import express from "express";
import { deleteUserController, getUserController,userLoginController, getAllUserController, updateUserController, userRegisterController } from "../controller/user/usercontroller.js";
import { isLogin } from "../middleware/isLogin.js";
import User from "../model/usermodel.js";


const userRoute = express.Router();

userRoute.post("/register", userRegisterController)
userRoute.post("/login", isLogin, userLoginController)
userRoute.get("/profile", getUserController)
userRoute.get("/:id", getAllUserController)
userRoute.delete("/:id", deleteUserController)
userRoute.put("/:id", updateUserController)

export default userRoute
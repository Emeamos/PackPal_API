
import express from "express";
import { deleteUserController, getUserController,userLoginController, getAllUserController, updateUserController, userRegisterController } from "../controller/user/usercontroller.js";
import { isLogin } from "../middleware/isLogin.js";
import User from "../model/usermodel.js";


const userRoute = express.Router();

userRoute.post("/register", userRegisterController)
userRoute.post("/login", userLoginController)


export default userRoute
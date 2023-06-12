
import express from "express";
import { userLoginController, userRegisterController, getUser, updateUserProfile, deleteUser } from "../controller/user/usercontroller.js";
import { isLogin } from "../middleware/isLogin.js";
import User from "../model/usermodel.js";


const userRoute = express.Router();

userRoute.post("/register", userRegisterController)
userRoute.post("/login", userLoginController)
userRoute.get("/:id", isLogin, getUser)
userRoute.put("/:id", isLogin, updateUserProfile)
userRoute.delete("/:id", isLogin, deleteUser)

export default userRoute
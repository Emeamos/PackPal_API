import express from "express"
import { addEssentialController, deleteEssential, getAllEssentialController, updateEssential } from "../controller/essentialscontroller.js";
import { isLogin } from "../middleware/isLogin.js";

const essentialsRoute = express.Router();

essentialsRoute.post("/add", isLogin,addEssentialController )
essentialsRoute.put("/:id", isLogin,updateEssential )
essentialsRoute.get("/all",isLogin, getAllEssentialController)
essentialsRoute.delete("/:id",isLogin, deleteEssential)




export default essentialsRoute
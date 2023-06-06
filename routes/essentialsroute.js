import express from "express"
import { addEssentialController, deleteEssential, getAllEssentialController, getEssential, updateEssential } from "../controller/essentialscontroller.js";
import { isLogin } from "../middleware/isLogin.js";

const essentialsRoute = express.Router();

essentialsRoute.post("/add", isLogin,addEssentialController )
essentialsRoute.put("/:id", isLogin,updateEssential )
essentialsRoute.get("/all", getAllEssentialController)
essentialsRoute.delete("/:id", deleteEssential)
essentialsRoute.get("/:id", getEssential)



export default essentialsRoute
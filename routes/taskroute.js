import express from "express"
import { addTaskController, allTaskController, editTaskController } from "../controller/taskcontroller.js";
import { isLogin } from "../middleware/isLogin.js";
import Task from "../model/taskmodel.js";

const taskRoute = express.Router();

taskRoute.post("/createtask", isLogin,addTaskController )
taskRoute.put("/edittask", isLogin,editTaskController )
taskRoute.get("/alltask", allTaskController)



export default taskRoute
import Expressss from "express";
import { isLogin } from "../middleware/isLogin.js";
import Task from "../model/taskmodel.js";

export const addTaskController = async(req, res)=> {
    const {taskname, category, status} = req.body;
    console.log(req.body);
    try {
        if (!( taskname && category && status)){
          return  res.status(400).send("All input is required");
        }
        const taskFound = await Task.findOne({taskname});
        const task = await Task.create({
            taskname,
            category,
            status,
            user: req.userAuth
        });
        if (taskFound){
            res.json({ 
                status: "error",
                message: "task already added"})
        }else{
        res.json({
            status:"success",
            data:task

        })
        }
    } catch (error){
        res.json(error.message)
    }
}
export const editTaskController = async(req, res)=> {
    const {taskname, category, status} = req.body;
    console.log(req.body);
    try {
        if (!(taskname && category && status)){
            res.status(400).send("All input is required");
        }
        const taskFound = await Task.findOneAndUpdate({taskname});
        const task = await Task.create({
            taskname,
            category,
            status,
            user: req.userAuth
        });
        if (taskFound){
            res.json({ 
                status: "error",
                message: "task already added"})
        }else{
        res.json({
            status:"success",
            message: "task update successfully"

        })
    }

    } catch (error) {
        res.json(error.message)
    }
}

export  const allTaskController = async (req,res)=> {
    const allTasks = await Task.find({});
    res.json({
        status:"success",
        data: allTasks
    })
}

export const deleteTaskController = async (req, res)=> {
    const {id} = req.params;
    try{
        await Task.findOneAndDelete({_id:id});
        res.json({
                status: "success",
                message:"task has been deleted succesfully"
            });        
        
    }catch(error) {
        console.log (error.message);

    }
}
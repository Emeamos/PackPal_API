import mongoose from "mongoose";
import User from "./usermodel.js";

const taskSchema = new mongoose.Schema;({
    taskname:{
        type: String,
        required: [true,"task is needed"]
    },
    category:{
        type : String,
        Enum:["personal","work"]
    },
    /*date:{
        type:Date,
        required:[true,"date is needed"]
    },*/
    status:{
        type : String,
        Enum:["incomplete","complete"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }}, {
        timestamp: true,
        toJSON:{virtuals: true}
})
const Task = mongoose.model('Task', taskSchema);

export default Task;
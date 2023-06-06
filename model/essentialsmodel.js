import mongoose from "mongoose";

const essentialsSchema = new mongoose.Schema;({
    essentials:{
        type: String,
        required: [true,"task is needed"]
    },
    // status:{
    //     type : String,
    //     Enum:["incomplete","complete"]
    // },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }}, {
        timestamp: true,
        toJSON:{virtuals: true}
})
const essential = mongoose.model('essentials', essentialsSchema);

export default essential;
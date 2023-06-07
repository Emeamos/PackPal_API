import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required:[true, "firstname is needed"]
    },
    email:{
        type: String,
        required:[true, "email is needed"]
    },
    password:{
        type: String,
        required:[true, "password is needed"]
    },

})

const User = mongoose.model('User', userSchema);

export default User;
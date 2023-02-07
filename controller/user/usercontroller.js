
import bcrypt from "bcrypt";
import express from "express";
import generateToken from "../../util/generatetoken.js";
import User from "../../model/usermodel.js";                     



export const userRegisterController = async(req, res)=>{
    const {firstname, lastname, email, password, gender, } = req.body;
    console.log(req.body);
    try {
        const userFound = await User.findOne({email});
        if (!req.body){
            return res.json({message: "pleass fill up the information"})
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const passwordhash = await bcrypt.hash(password, salt);

        const user = await User.create({
            
            firstname,
            lastname,
            email,
            password: passwordhash,
            gender,
        })
        res.json({
            status:"success",
            data:user

        })
    } catch (error) {
        res.json(error.message)
    }
}

export const userLoginController = async(req, res)=>{
    //console.log("is data coming in");
    const {email, password} = req.body;
    try {
       
        const foundUser = await User.findOne({email});
        //console.log(foundUser);
        if (!foundUser){
        return  res.json({status: "error",
            message: "wrong login details"
        })
            
        }//console.log(password, foundUser.password)
        const foundpassword = await bcrypt.compare(password, foundUser.password);
        
       if (!foundpassword){
        return  res.json({status: "error",
        message: "wrong email or passsword"})
       }else{
        res.json({
            status:"success",
            data:{
                firstname: foundUser.firstname,
                lastname: foundUser.lastname,
                email: foundUser.email,
                token: generateToken(foundUser._id)

            },
        });
       }

    } catch (error) {
        res.json(error.message)
    }
}

export const getUserController = async(req, res)=>{
    const {id} = req.params
    try {
        //const token = obtainTokenFromHeader(req);
        const foundUser = await User.findById(id);
        if (foundUser){
        res.json({
            status:"success",
            data: foundUser
        })
    }else {
        res.json({
            status: "success",
            message: foundUser
        });
    }
    } catch (error) {
        res.json(error.message)
    }
}
export const getAllUserController = async(req, res) => {
    const allUsers = await User.find()
    try{
        res.json({
            status: "success",
            data: {allUsers}
        });
    }catch(error){
        res.json(error.message)
    }
}
export const deleteUserController =async(req, res)=>{
    try {
        res.json({
            status:"success",
            data:"user deleted successfully"
        })
    } catch (error) {
        res.json(error.message)
    }
}

export const updateUserController = async(req, res)=>{
    
    try {
        if(!req.body){
            return res
                .status(400)
                .send({ message : "updated Data can not be empty"})
        }else{
        res.json({
            status:"success",
            data:"user updated successfully"
         })}
         const id = req.params.id;
        User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
    } catch (error) {
        res.json(error.message)
    }
}
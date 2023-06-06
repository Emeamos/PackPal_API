import bcrypt from "bcrypt";
import generateToken from "../../util/generatetoken.js";
import loginValidation from "../../validation/login.js";
import registerValidation from "../../validation/register.js";
import User from "../../model/usermodel.js";                     


// Register a new user
export const userRegisterController = async (req, res) => {
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { email, password, name } = req.body;
  
    try {
      // Check if user already exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
        // Hash password and save user
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        // Create new user
        const user = await User.create({
          name,
          email,
        //   confirmPassword: hashedPassword,
          password: hashedPassword,
        });
        res.json({
          status: "success",
          data: user,
        });
      }
    } catch (error) {
      res.json(error.message);
    }
  };

// Login a user
export const userLoginController = async (req, res) => {
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { email, password } = req.body;
  
    // console.log(req.headers);
  
    // Check if user exists and is a student
    const user = await User.findOne({ email});
    try {
      if (!user) {
        return res.status(401).json({ message: "Wrong details" });
      }
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      } else {
        res.json({
          status: "success",
          data: {
            name: user.firstname,
            email: user.email,
            token: generateToken(user.id),
          },
        });
      }
      // // Create JWT token
      // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
      // // Send token to client
      // res.json({ token });
    } catch (error) {
      console.log(error.message);
    }
  };

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
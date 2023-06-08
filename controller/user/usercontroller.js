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

  export const getUser = async(req, res) => {
    try{
        const foundUser = await User.findById(req.userAuth);
        if(foundUser){
            const { name, username, email } = foundUser;
            res.json({
                status: "Success",
                data: {
                    name,
                    username,
                    email
                }
            });
        } else {
            res.json({
                status: "Success",
                message: "User does not exist"
            });
        }
    } catch(error){
        res.json(error.message)
    }
  }

  export const deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.userAuth);
  
      if (deletedUser) {
        res.json({
          status: "Success",
          message: "User deleted successfully"
        });
      } else {
        res.json({
          status: "Success",
          message: "User does not exist"
        });
      }
    } catch (error) {
      res.json(error.message);
    }
  };

export const updateUserProfile = async (req, res) => {
    const { name, username, oldPassword, newPassword } = req.body;
    try {
      const user = await Reg.findById(req.userAuth);
      if (!user) {
        return res.json({ status: "error", message: "User not found" });
      }
      if (user.password !== oldPassword) {
        return res.json({ status: "error", message: "Invalid old password" });
      }
      user.name = name;
      user.username = username;
      user.password = newPassword;
      await user.save();
      res.json({
        status: "success",
        message: "Profile updated successfully",
        data: {
          user,
        },
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  };
  
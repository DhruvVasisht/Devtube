import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken.js";

export const register = async (req,res) =>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json
            ({
                success:false,
                message: "Please enter all fields"
            });
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json
            ({
                success:false,
                message: "Email already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password:hashedPassword
        })
        return res.status(201).json({
            success:true,
            message: "Account registered successfully",
        })
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message: "Failed to register. Please try again later."
        })
        
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email ||!password){
            return res.status(400).json
            ({
                success:false,
                message: "Please enter email and password"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json
            ({
                success:false,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json
            ({
                success:false,
                message: "Incorrect password"
            });
        }
        generateToken(res, user, `Welcome Back ${user.name}`);
        
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to login. Please try again later."
        })
        
    }
}
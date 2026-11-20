import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (![name, email, phone, password].every((value) => typeof value === "string" && value.trim())) {
            return res.status(400).json({ message: "Name, email, phone, and password are required.", success: false });
        }

        await User.create({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), password });
        return res.status(201).json({ message: "User created successfully", success: true });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "An account with this email already exists.", success: false });
        }
        console.error("Registration failed:", error.message);
        const status = error.name === "ValidationError" ? 400 : 500;
        return res.status(status).json({ message: error.message, success: false });
    }
};


//login
export const login=async(req,res)=>{
    try {

        const{email,password}= req.body ; //accessing point
        const isExist=await User.findOne({ email })
         
        if (!isExist) {
            return res.status(400).json({success:false,message:"User not exist!!"}) 
        }

        const auth= await bcrypt.compare(password,isExist.password)//when we put a password =latest pass retuen a boolean
        if (!auth) {
            return res.status(401).json({message:"Incorrect Password !!!" ,success:false })
            
        }

        const token =jwt.sign({id:isExist._id,email:isExist.email,role:isExist.role},process.env.JWT_SECRET,{expiresIn:"1hr" })
        console.log(token);
        res.cookie("token",token,{maxAge:60 * 60 * 1000})
        
        res.status(200).json({message:"Login Success",success:true})

    } catch (error) {
        console.log(error);
        
     res.status(500).json({ message: error.message, success: false });

    }
}
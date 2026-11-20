//for creating a model first we should create a schema
//import mongoose
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


//create a schema
const userSchema=new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true, lowercase:true, unique:true},
    password:{type:String, required:true},
    phone:{type:String, required:true, trim:true},
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    //address will be an object
    Address:{
       fullName:String,
       phone:String,
       street:String,
       city:String,
       state:String,
       pincode:String,
       country:String
    },
    isVerified:Boolean,
    isBlocked:Boolean
})
//pre is a middleware before save this function runs

userSchema.pre("save",async function(){
    if (!this.isModified("password")) {
        return
    }
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)
})
//generating Model
const User = mongoose.model("users",userSchema);
export default User
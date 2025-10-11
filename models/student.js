import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        trim:true

    },
    last_name:{
       type:String,
        required:true,
        trim:true
    },
    email:{
       type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase: true 
    },
    mobile:{
        type:String,
        required:true,
     
    },
    password:{
     type:String,
     required:true,
        
    },
     role:{
        type:String,
        enum:["student","teacher"],
        default:"student"
    },
    gender:{
        type:String,
        enum:["male","female","others"]
    },
    profile:{
    type:String,
    default:""
    
    }
},{timestamps:true});

export default mongoose.model("Student",studentSchema)
import mongoose from "mongoose";
const ResultSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,ref:"Student",required:true
    },
    paper:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Paper",
        required:true
    },
    answers:{
        type:Object,
        default:{}
    },
    score:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        required:true
    },
    percentage:{
        type:Number,required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

ResultSchema.index({student:1,paper:1});

export default mongoose.model('Result',ResultSchema)
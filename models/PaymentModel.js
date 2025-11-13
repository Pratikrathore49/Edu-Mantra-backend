import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Student'
    },
    amount:Number,
    orderId:String,
    paymentId:String,
    status:{
        type:String,default:'pending'
    },
    createdAt:{type:Date,default:Date.now}
});


export default mongoose.model("Payment",paymentSchema);
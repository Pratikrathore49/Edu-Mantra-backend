import { Schema, model } from "mongoose";

const paperSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    duration: { type: Number, required: true },
    question: [{type: Schema.Types.ObjectId,ref: "Questions",}],
    subject: { type: String, trim: true ,required:true,lowercase:true},
    totalMarks: { type: Number, default: 1,required:true },
    examType: { type: String, trim: true },
    note: { type: String, trim: true },
    isPaid: { type: Boolean,default: false,},
  },
  { timestamps: true }
);

export default model("Paper", paperSchema);

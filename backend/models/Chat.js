import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['sent','received'],
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now,
    },
    sender:{ type: mongoose.Schema.Types.ObjectId,ref:' User',required:true},
    recipient:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
});

const chatSchema=new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            
        },
    ],
    messages:[messageSchema],
});

const Chat=mongoose.model('Chat',chatSchema)

export default Chat;
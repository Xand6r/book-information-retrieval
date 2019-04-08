const mongoose=require("mongoose");

const  requestSchema=new mongoose.Schema({
    requester:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    info:String
});

module.exports=mongoose.model("request",requestSchema);


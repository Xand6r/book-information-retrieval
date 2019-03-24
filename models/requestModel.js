const mongoose=require("mongoose");

const  requestSchema=new mongoose.Schema({
    requester:mongoose.Schema.Types.ObjectId,
    info:String
});

module.exports=mongoose.model("request",requestSchema);


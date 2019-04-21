const mongoose=require("mongoose");

const  requestSchema=new mongoose.Schema({
    requesterId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    requesterName:String,
    bookId:{type:mongoose.Schema.Types.ObjectId,ref:"book"},
    status:String
});

module.exports=mongoose.model("request",requestSchema);


const mongoose=require("mongoose");

const userSchema=new  mongoose.Schema({
    name:String,
    password:String,
    status:String,
});

module.exports=mongoose.model("user",userSchema);
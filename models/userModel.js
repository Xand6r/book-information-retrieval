const mongoose=require("mongoose");

const userSchema=new  mongoose.Schema({
    name:String,
    password:String,
    status:String,
    bookRequests:Array,
    // {bookId,notification}
});

module.exports=mongoose.model("user",userSchema);
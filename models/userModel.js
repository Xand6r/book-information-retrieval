const mongoose=require("mongoose");

const userSchema=new  mongoose.Schema({
    username:String,
    password:String,
    status:String,
    bookRequests:{
        type:Array,
        default:[]
    }
    // {bookId,notification}
});

module.exports=mongoose.model("user",userSchema);
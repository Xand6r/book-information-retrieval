let mongoose=require("mongoose")

const bookSchema=new mongoose.Schema({
    title:String,
    author:String,
    edition:String,
    publicationYear:Date,
    quantity:Number,
    category:String,
    uploadDate:{
        type:Date,
        default:Date.now
    }

});

module.exports=mongoose.model("book",bookSchema);
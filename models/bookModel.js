let mongoose=require("mongoose")

const bookSchema=new mongoose.Schema({
    title:String,
    author:String,
    isbn:String,
    publisher:String,
    category:String,
    publicationYear:Date,
    uploadDate:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("book",bookSchema)
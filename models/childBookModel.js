let mongoose=require("mongoose")

const childBookSchema=new mongoose.Schema({
    title:String,
    author:String,
    edition:String,
    publicationYear:Date,
    category:String,
    parent:{type:mongoose.Schema.Types.ObjectId,ref:"book"},
    requested:{
        type:Boolean,
        default:false
    },
    uploadDate:{
        type:Date,
        default:Date.now
    }

});

module.exports=mongoose.model("childBook",childBookSchema);
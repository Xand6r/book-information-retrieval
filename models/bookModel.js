let mongoose=require("mongoose")

const bookSchema=new mongoose.Schema({
    // attributes of a book
})

export default mongoose.model("book",bookSchema)
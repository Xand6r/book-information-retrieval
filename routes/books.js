const express = require('express');
const router = express.Router();
const bookModel=require("../models/bookModel");
const categories=[];

/* GET all the books in the database. */
router.get('/', async function(req, res, next) {
  books=await bookModel.find({});
  res.json(books);
});



/*POST or add books to the database*/ 
router.post("/addBook",async function(req,res){
  console.log(req.body.category.toLowerCase())
  let newBook=new bookModel();
  newBook.title=req.body.title.toLowerCase();
  newBook.author=req.body.author.toLowerCase();
  newBook.isbn=req.body.isbn.toLowerCase();
  newBook.publisher=req.body.publisher.toLowerCase();
  newBook.category=req.body.category.toLowerCase();
  newBook.publicationYear=req.body.publicationYear.toLowerCase();

  let book=await newBook.save();
  console.log(book);
  res.json({status:"succesfully saved"});

})

router.get("/addBook",async function(req,res){
  res.render("index.jade")
})

/* route  to delete  a book based on id */
router.get("/remove/:id",function(req,res){
  // find the book by id and delete it
  let  id=req.params.id;
  bookModel.findByIdAndDelete(id)
  .exec((err,book)=>{
    if(err){
      res.json({status:"unsuccesfull"})
    }
      console.log(book)
      res.json({status:"succesful"})
  })
})


/* GET 5 random books from a specified category */
router.get("/:category/:limit",async function(req,res){
  // limit is the number of books to fetch
  // category states the category of the book to be fetched
  const limit=Number(req.params.limit);
  const category=req.params.category;

  // fetching the books from the database per-category
  let books=await bookModel.find({category}).limit(limit);

  // return the book to the request
  res.json(books);

})





module.exports = router;

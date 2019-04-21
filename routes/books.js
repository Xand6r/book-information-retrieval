const express = require('express');
const router = express.Router();
const bookModel=require("../models/bookModel");
const categories=['Mathematical Sciences', 'Computer Science',
'Chemistry and Industrial Chemistry', 'Biochemistry',
'Biology and Genetics', 'Microbiology',
'Medical Laboratory Science', 'Engineering', 'Nursing', 'Geology',
'Physics and Geophysics', 'Chemical Technology',
'Agricultural Science', 'Anatomy', 'Physiology',
'Business Administration', 'Banking and finance', 'Economics',
'Political Science', 'International Relations', 'Accounting', 'Law',
'Mass Communication', 'Sociology', 'Criminology',
'Public Administration'
]

/* GET all the books in the database. */
router.get('/', async function(req, res, next) {
  books=await bookModel.find({});
  res.json(books);
});

// get a specific book based on id
router.get("/getOne/:id",(req,res)=>{
  bookModel.findById(req.params.id,(err,book)=>{
    if(err){
      res.json({"status":"unsuccesfull"})
    }
    else{
      res.json(book)
    }
  })
})

router.get("/categories",(req,res)=>{
  res.json(categories)
})

// route to get 5 random books from each category...
router.get("/random",async function(req,res){
  let category=categories[Math.floor(Math.random()*categories.length)]
  console.log(category)
  book=await bookModel.find({category:category.toLowerCase()})
  console.log(book)
  let cursor=Math.random()*(book.length-5);
  let returnedBook=book.slice(cursor,cursor+4);
  res.json(returnedBook)
})


/*POST or add books to the database*/ 
router.post("/addBook",async function(req,res){
  let newBook=new bookModel();

  newBook.title=req.body.title.toLowerCase();
  newBook.author=req.body.author.toLowerCase();
  newBook.edition=req.body.edition.toLowerCase();
  newBook.quantity=req.body.quantity;
  newBook.category=req.body.category.toLowerCase();
  newBook.publicationYear=req.body.publicationYear;

  newBook.save((err,book)=>{
    if(err){
      console.log(err)
      return
    }
    console.log(book)
    res.json({status:"succesfull"});

  });
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
      res.json({status:"succesfull"})
  })
})

// route to update a book
router.post("/update/:id",function(req,res){
  bookModel.findById(req.params.id,async function(err,book){
    book.title=req.body.title.toLowerCase();
    book.author=req.body.author.toLowerCase();
    book.edition=req.body.edition.toLowerCase();
    book.quantity=req.body.quantity;
    book.category=req.body.category.toLowerCase();
    book.publicationYear=req.body.publicationYear;
    let updatedBook=await book.save();
    console.log(updatedBook);
    res.json(updatedBook);
  })
})


/* GET books from a specified query */
router.get("/:queryParam/:value",async function(req,res){
  // query means the attribute we want to search the database for
  // value means the specific attribute we want to find
  const queryParam=req.params.queryParam;
  const value=req.params.value.toLowerCase();

  
  let query=Object();
  query[queryParam]=new RegExp(value);
  // fetching the books from the database per-category
  let books=await bookModel.find(query);

  // return the book to the request
  res.json(books);

})




module.exports = router;

const express = require('express');
const router = express.Router();
const bookModel=require("../models/bookModel");

/* GET all the books in the database. */
router.get('/', async function(req, res, next) {
  books=await bookModel.find({});
  res.json(books);
});

router.get("/categories",(req,res)=>{
  categories=['Mathematical Sciences', 'Computer Science',
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

  res.json(categories)
})

// route to get 5 random books from each category...
router.get("/random",async function(req,res){
  categories=['Mathematical Sciences', 'Computer Science',
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

  books=[];
  for(i=0;i<categories.length;i++){
    book=await bookModel.find({category:categories[i].toLowerCase()});
    console.log(book)
    let cursor=Math.random()*(book.length-5);
    books[i]=book.slice(cursor,cursor+5);
  }
  res.json(books)
})


/*POST or add books to the database*/ 
router.post("/addBook",async function(req,res){
  let newBook=new bookModel();

  newBook.title=req.body.title.toLowerCase();
  newBook.author=req.body.author.toLowerCase();
  newBook.edition=req.body.edition.toLowerCase();
  newBook.quantity=req.body.quantity;
  newBook.category=req.body.category.toLowerCase();
  newBook.publicationYear=req.body.publicationYear.toLowerCase();

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


/* GET books from a specified query */
router.get("/:queryParam/:value",async function(req,res){
  // query means the attribute we want to search the database for
  // value means the specific attribute we want to find
  const queryParam=req.params.queryParam;
  const value=req.params.value.toLowerCase();

  
  let query=Object();
  query[queryParam]=value;
  // fetching the books from the database per-category
  let books=await bookModel.find(query);

  // return the book to the request
  res.json(books);

})




module.exports = router;

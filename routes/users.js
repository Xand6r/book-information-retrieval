var express = require('express');
var router = express.Router();
var userModel=require("../models/userModel");

/* GET users listing. */
router.get('/getAll', async function(req, res, next) {
  let data=await userModel.find({})
  res.json(data);
});

// POST a user to the database
router.post("/addOne",(req,res)=>{
  let newUser=new userModel();
  newUser.name=req.body.name.toLowerCase();
  newUser.password=req.body.password.toLowerCase();
  newUser.status=req.body.status||"user"
  
  newUser.save((err,book)=>{
    if(err){
      res.json({"status":"unsucessful"});
      return;
    }

    res.json(book);
    console.log(book);
  })
})



module.exports = router;

var express = require('express');
var router = express.Router();
var passport=require("passport");
var localStrategy=require("passport-local").Strategy;
var userModel=require("../models/userModel");


// defining the local strategy for authentication
passport.use(new localStrategy(
  function(username,password,done){
    userModel.findOne({username},function(err,user){
      if(err){
        throw err
      }
      if(!user){
        return done(null,false,{"message":"unknown user"})
      }
      if(user.password==password){
        return done(null,user)
      }
      return done(null,false,{"message":"invalid password"})
    })
  }
))

passport.serializeUser(function(user,done){
  done(null,user.id)
})

passport.deserializeUser(function(id,done){
  userModel.findById(id,function(err,user){
    return done(err,user)
  })
})




/* GET users listing. */
router.get('/getAll', async function(req, res, next) {
  let data=await userModel.find({})
  res.json(data);
});

// POST a user to the database
router.post("/register",(req,res)=>{
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

router.add("/login",passport.authenticate("local",{successRedirect:"/",failureRedirect:"/"}),(req,res)=>{
  res.redirect("/")
})

router.get("/logout",function(req,res){
  req.logOut();
  res.redirect("/")
})

module.exports = router;

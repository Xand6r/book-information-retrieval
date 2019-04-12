var express = require('express');
var router = express.Router();
var passport=require("passport");
var localStrategy=require("passport-local").Strategy;
var userModel=require("../models/userModel");


// defining the local strategy for authentication
passport.use(new localStrategy(
  function(username,password,done){
    console.log(username)
    userModel.findOne({username:username},function(err,user){
      console.log(user)
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
router.get('/', async function(req, res, next) {
  let data=await userModel.find({})
  res.json(data);
});

// POST a user to the database
router.post("/register",(req,res)=>{
  let newUser=new userModel();
  newUser.username=req.body.username.toLowerCase();
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

router.post("/login",passport.authenticate("local",{failureRedirect:"/notFound"}),(req,res)=>{
  res.json(req.user);
})

router.get("/logout",function(req,res){
  req.logOut();
  res.redirect("/")
})

module.exports = router;

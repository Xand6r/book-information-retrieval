let requestModel=require("../models/requestModel");
let express=require("express")
let router=express.Router();


// route to get all requests in the database
router.get("/",async function(req,res){
    let requests=await requestModel.find({});
    res.json(requests);
})


// route to add a request
router.post("/",async function(req,res){
    if(!req.body.requester||!req.body.info){
        res.json({status:"unsucessfull"});
        return
    }
    let newRequest=new requestModel();

    newRequest.requester=req.body.requester;
    newRequest.info=req.body.info;
    newRequest=await newRequest.save();
    
    console.log(newRequest);
    res.end({status:"succesfull"});

})

module.exports=router
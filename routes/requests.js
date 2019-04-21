let requestModel=require("../models/requestModel");
let userModel=require("../models/userModel");
let bookModel=require("../models/bookModel");
let express=require("express");
let router=express.Router();


// route to get all requests in the database
router.get("/",async function(req,res){
    let requests=await requestModel.find({status:"pending"}).populate("bookId")
    res.json(requests);
    // not approved
})


// route to add a request
router.post("/addRequest",async function(req,res){
    if(!req.body.userId||!req.body.bookId||!req.body.requesterName){
        res.json({status:"incomplete parameters"});
        return
    }
    let newRequest=new requestModel();

    newRequest.requester=req.body.userId;
    newRequest.bookId=req.body.bookId;
    newRequest.requesterName=req.body.requesterName;
    newRequest.status="pending";
    newRequest=await newRequest.save();
    
    userModel.findById(req.body.userId,async function(err,user){
        if(err){
            res.json({"status":"there was an error"})
            return;
        }
        
        user.bookRequests.push(newRequest.id);
        updatedUser=await user.save();
        res.json(updatedUser);
    })

    console.log(newRequest);

});

router.get("/approveRequest/:reqId",function(req,res){
    requestModel.findById(req.params.reqId,function(err,request){
        if(err){
            res.json({"status":"there was an error"});
            return;
        }
        bookModel.findById(request.bookId,async (err,book)=>{
            if(book.quantity==1){
                res.json({"message":"cannot borrow when book is one"})
            }
            book.quantity=String(Number(book.quantity)-1);
            await book.save();    
            request.status="approved";
            await request.save();
            res.json({"status":"sucessful"});
        })
    })
})

router.get("/one/:id",async function(req,res){
    let request=await requestModel.findById(req.params.id).populate("bookId");
    res.json(request);
})


module.exports=router
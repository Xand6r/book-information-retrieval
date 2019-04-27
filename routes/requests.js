let requestModel=require("../models/requestModel");
let userModel=require("../models/userModel");
let bookModel=require("../models/bookModel");
let childBookModel=require("../models/childBookModel");
let express=require("express");
let router=express.Router();


// route to get all requests in the database
router.get("/",async function(req,res){
    let requests=await requestModel.find({status:"pending"}).populate("bookId")
    res.json(requests);
    // not approved
})


// route to add a request
// when making a request we use the books own id
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


// when approving the id sent is going to be the child's own
router.get("/approveRequest/:reqId",function(req,res){
    requestModel.findById(req.params.reqId,function(err,request){
        if(err){
            res.json({"status":"there was an error"});
            return;
        }
        childBookModel.findById(request.bookId,async (err,childBook)=>{
            let book=await bookModel.findById(childBook.parent);
            if(book.quantity==1){
                res.json({"message":"cannot borrow when book is one"})
                return
            }

            // change the status of the requested variable to 'true'
            childBook.requested=true;

            // reduce the quantity of the parent and save
            book.quantity=String(Number(book.quantity)-1);

            // change the status of the requests to approved
            request.status="approved";
            
            // save all the updated versions of the models
            await childBook.save();
            await book.save();    
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
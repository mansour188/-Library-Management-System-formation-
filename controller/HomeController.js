const BookModel=require('../model/books')
exports.getThreeBooks=(req,res)=>{
   BookModel.getThreeBooks().then((data)=>{
      console.log("****************************************")
    res.render("index",{books:data,verifUser:req.session.userId})
   }).catch((error)=>{
    throw error; // Rethrow the error or return a rejected promise

   })}
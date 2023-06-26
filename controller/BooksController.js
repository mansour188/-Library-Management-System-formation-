const BookModel=require('../model/books')

exports.getAllbook=(req,res)=>{
   BookModel.getAllBooks().then((data)=>{
      
    res.render("books",{books:data,verifUser:req.session.userId})
   }).catch((error)=>{
    console.log("error")
    res.status(500).send("iternel server error !!!!!")

   })


}

exports.getDetails=(req,res)=>{
   const id=req.params.id
   console.log(id)
   BookModel.getDetails(id).then((resultat)=>{
      res.render("details",{book:resultat,verifUser:req.session.userId})
   }).catch((err)=>{

      res.status(500).send("iternel server error !!!!!")
   })

}
exports.addBook=(req,res)=>{
   res.render("addBook",{verifUser:req.session.userId})
}
exports.postBook=(req,res)=>{
   console.log("book posted")
}



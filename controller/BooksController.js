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
   res.render("addBook",{verifUser:req.session.userId,succedMsg:req.flash("succedMsg")[0],failedMsg:req.flash("failedMsg")[0]})
}
exports.postBook=(req,res)=>{


 BookModel.addBook(req.body.title,req.body.Author,req.body.description,req.body.price,req.file.filename,req.session.userId)
 .then((data)=>{
   
   req.flash("succedMsg",data)
   res.redirect("/addBook")
 }).catch((err)=>{
   
   req.flash("failedMsg",err)
   res.redirect("/addBook")
 })
   
}
exports.getMyBook=(req,res)=>{
   BookModel.getMyBook(req.session.userId).then((data)=>{
      res.render("myBooks",{verifUser:req.session.userId,books:data})
   })

}
exports.deleteBook=(req,res)=>{
   BookModel.deleteBook(req.params.id).then((data)=>{
      if(data){
         res.redirect("/myBooks")
      }
   }).catch((err)=>{
      res.redirect("/myBooks")
   })
}
exports.updateBook=(req,res)=>{
   BookModel.updateBook(req.params.id).then((Book)=>{
      res.render("updateBook",{verifUser:req.session.userId,book:Book,succedMsg:req.flash("succedMsg")[0],failedMsg:req.flash("failedMsg")[0]})
   })

}
exports.postupdateBook=(req,res)=>{
   if(req.file){
      BookModel.postUpdateBook(req.body.oldId,req.body.title,req.body.Author,req.body.description,req.body.price,req.file.filename,req.session.userId)
      .then((data)=>{
        
        req.flash("succedMsg",data)
        res.redirect(`/myBooks/update/${req.body.oldId}`)      }).catch((err)=>{
        
        req.flash("failedMsg",err)
        res.redirect(`/myBooks/update/${req.body.oldId}`)      })
   }else{
      BookModel.postUpdateBook(req.body.oldId,req.body.title,req.body.Author,req.body.description,req.body.price,req.body.oldImg,req.session.userId)
      .then((data)=>{
        
        req.flash("succedMsg",data)
        res.redirect(`/myBooks/update/${req.body.oldId}`)
      }).catch((err)=>{
        console.log(err)
        req.flash("failedMsg",err)
        res.redirect(`/myBooks/update/${req.body.oldId}`)
      })
   }

}
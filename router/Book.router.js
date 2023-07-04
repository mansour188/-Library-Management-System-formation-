const router=require("express").Router()
const multer=require("multer")
const guardAuth=require("./guardAuth")
const ControllerBook=require("../controller/BooksController")
router.get('/books',guardAuth.isNotAuth,ControllerBook.getAllbook)
router.get("/books/:id",guardAuth.isNotAuth,ControllerBook.getDetails)
router.get("/addBook",guardAuth.isNotAuth,ControllerBook.addBook)
router.get("/myBooks",guardAuth.isNotAuth,ControllerBook.getMyBook)
router.get("/myBooks/delete/:id",guardAuth.isNotAuth,ControllerBook.deleteBook)
router.get("/myBooks/update/:id",guardAuth.isNotAuth,ControllerBook.updateBook)




router.post("/addBook",
multer({
 storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"assets/upload")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
 })
}).single("image"),
guardAuth.isNotAuth,ControllerBook.postBook)

router.post("/myBooks/save",
multer({
 storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"assets/upload")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
 })
}).single("image"),
guardAuth.isNotAuth,ControllerBook.postupdateBook)
module.exports=router
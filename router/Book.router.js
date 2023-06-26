const router=require("express").Router()
const guardAuth=require("./guardAuth")
const ControllerBook=require("../controller/BooksController")
router.get('/books',guardAuth.isNotAuth,ControllerBook.getAllbook)
router.get("/books/:id",guardAuth.isNotAuth,ControllerBook.getDetails)
router.get("/addBook",guardAuth.isNotAuth,ControllerBook.addBook)
router.post("/addBook",guardAuth.isNotAuth,ControllerBook.postBook)
module.exports=router
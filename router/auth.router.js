const router=require("express").Router()
const guardAuth=require("./guardAuth")
const controllerRegister=require("../controller/AuthController")
const bodyParser=require("express").urlencoded({extended:true})
router.get("/register",guardAuth.isAuth,controllerRegister.getRegister)
router.post("/register",bodyParser,controllerRegister.registerUser)
router.get("/login",guardAuth.isAuth,controllerRegister.getLogin)
router.post("/login",bodyParser,controllerRegister.sendDatalogin)
router.post("/logout",controllerRegister.logout)

module.exports=router
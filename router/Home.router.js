const router=require("express").Router()
const ControllerHome=require("../controller/HomeController")
router.get("/",ControllerHome.getThreeBooks)
module.exports=router
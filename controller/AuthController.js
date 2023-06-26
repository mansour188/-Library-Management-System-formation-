const model=require("../model/auth")
exports.getRegister=(req,res)=>{
    res.render("register",{verifUser:req.session.userId,error:req.flash("error")[0]})
}
exports.registerUser=(req,res)=>{
    console.log(req.body.name)
    model.registerUser(req.body.name,req.body.email,req.body.password).then((user)=>{
        res.redirect("login")
    }).catch((err)=>{
        req.flash("error",err)
        res.redirect("/register")
        
    })

}

exports.getLogin=(req,res)=>{
    res.render("login",{verifUser:req.session.userId,error:req.flash("error")[0]})

}
exports.sendDatalogin=(req,res)=>{
   
    model.sendDatalogin(req.body.email,req.body.password).then((data)=>{
       

        req.session.userId=data
        res.redirect("/")
        

    }).catch((err)=>{
        req.flash("error",err)
        console.log(err.message)
        res.redirect("/login")
        

    })


}
exports.logout=(req,res)=>{
    req.session.destroy(()=>{
        res.clearCookie('mySession'); 
        res.redirect("login")
    })

}
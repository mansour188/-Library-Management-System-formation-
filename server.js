const { assert } = require('console')
const express=require('express')
const path=require("path")
const routerBook=require('./router/Book.router')
const routerHome=require('./router/Home.router')
const AuthRouter=require("./router/auth.router")
const session=require('express-session')
const Mong_session=require('connect-mongodb-session')(session)

const flash=require('connect-flash')



const app=express()
var store=new Mong_session({
    uri: 'mongodb://mongoadmin:mongoadmin@localhost:27017/',
    databaseName:"storeBooks",
  collection: 'mySessions'
})


app.use(flash())

app.use(express.static(path.join(__dirname,"assets")))
app.set("view engine","ejs")
app.set("views","views")

app.use(session({
    name:"mySession",
    secret:"secret_key",
    cookie:{
        maxAge:1000*60*60*24*2
    },
    store:store
}))


app.use("/",routerBook)
app.use("/",routerHome)
app.use("/",AuthRouter)
app.use("/",routerBook)


app.listen(3000,()=>{
    console.log("app runing in port 3000")
})
const mongoose=require("mongoose")
const bcrypt=require('bcrypt');
const { resolve } = require("path");
const { error } = require("console");
const { use } = require("../router/Book.router");
const { verify } = require("crypto");
var url='mongodb://mongoadmin:mongoadmin@localhost:27017'
const dbName = 'storeBooks';
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String

})
const user=mongoose.model("user",userSchema)
mongoose.connect(url,{"dbName":dbName}).then(()=>{
    console.log("mongoose connected")
})
exports.registerUser=(name,email,password)=>{
    return new Promise((resolve,rej)=>{
     
            user.findOne({email:email})
    .then((user)=>{
        
        if(user){
            rej("email is exist !!")
        }else{
            return bcrypt.hash(password,11)
        }
    }).then((passwordHash)=>{
        const newuser=new user({
            name:name,
            password:passwordHash,
            email:email
        });
       return newuser.save()
    }).then((newuser)=>{
        resolve("user registered")
    }).catch((err)=>{
        rej(err)
    })
})
}

exports.sendDatalogin=(email,password)=>{
    return new Promise((resolve,reject)=>{
        user.findOne({email:email}).then((user)=>{
            if(user){
                 bcrypt.compare(password,user.password).then((verify)=>{
                    console.log(verify)
                    if(verify){
                        
                        resolve(user._id)
                    }else{
                        reject("password incorrect !!")
                    }
                 })
            }else{
                reject("user dont found !!")
            }
        })
    })
}
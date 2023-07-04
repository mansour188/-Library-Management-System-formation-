const { error } = require("console");
const mongoose=require("mongoose");
const { resolve } = require("path");
const url='mongodb://mongoadmin:mongoadmin@localhost:27017'
const dbName = 'storeBooks';
const SchemaBook=mongoose.Schema(
   { 
    title: String,
    description: String,
    price: Number,
    author: String,
    img: String,
    userId:String
}

)
const book=mongoose.model("books",SchemaBook)


mongoose.connect(url,{"dbName":dbName}).then(()=>{
    console.log("mongoos connected")
})

exports.getThreeBooks=()=>{
    return  book.find().limit(3).then((data)=>{
        return data
    }).catch((error)=>{
        throw error; // Rethrow the error or return a rejected promise


    })

}
exports.getAllBooks=()=>{
    return  book.find().then((data)=>{
        console.log(data)
        return data
    }).catch((error)=>{
        throw error; // Rethrow the error or return a rejected promise


    })
}
exports.getDetails=(id)=>{
    return book.findById(id).then((resultat)=>{
        console.log(resultat)
        return resultat
    }).catch((error)=>{
        throw error
    })

}

exports.addBook=(title,Author,description,price,filename,userId)=>{
    return new Promise((resolve,reject)=>{
        let newBook=new book({
            title: title,
            description: description,
            price: price,
            author: Author,
            img: filename,
            userId:userId

        })
        return newBook.save()
        
    .then((data)=>{
        resolve("book Added !!")
    }).catch((error)=>{
        reject(error)
    })
      
    })}


exports.getMyBook =(userId)=>{
        return  book.find({	userId :userId}).then((data)=>{
            console.log(data)
            return data
        }).catch((error)=>{
            throw error; // Rethrow the error or return a rejected promise
    
    
        })
    }

    exports.deleteBook=(id)=>{
        return new Promise((resolve,reject)=>{
            book.deleteOne({_id:id}).then(result=>{
                resolve(true)
            }).catch((error)=>{
               reject(false)
            })
        })

    }


    exports.updateBook=(id)=>{
        return new Promise((resolve,reject)=>{
            book.findOne({_id:id}).then(result=>{
                resolve(result)
            }).catch((error)=>{
               reject("error")
            })
        })
    }



exports.postUpdateBook=(oldId,title,Author,description,price,filename,userId)=>{
    return new Promise((resolve,reject)=>{
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        return book.updateOne({_id:oldId},{
            title: title,
            description: description,
            price: price,
            author: Author,
            img: filename,
            userId:userId

        })
        
    .then((data)=>{
        resolve("book Added !!")
    }).catch((error)=>{
        reject("error")
    })
      
    })}

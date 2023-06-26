const mongoose=require("mongoose")
const url='mongodb://mongoadmin:mongoadmin@localhost:27017'
const dbName = 'storeBooks';
const SchemaBook=mongoose.Schema(
   { 
    title: String,
    description: String,
    price: Number,
    author: String,
    img: String}

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
const mongoose = require('mongoose')

const MONGODBURI = process.env.MONGODB_URL

const InicializaMongoServer = async()=>{
    try{
        await mongoose.connect(MONGODBURI,{
            useNewUrlParser:true, useCreateIndex:true,
            useFindAndModify:true, useUnifiedTopology:true
        })
        console.log("Conectado ao mongoDB!")
    }catch(e){
        console.error(e)
        throw e
    }
}

module.exports = InicializaMongoServer
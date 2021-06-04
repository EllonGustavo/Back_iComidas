const moongoose = require('mongoose')
//Criando o Schema categoria

const CategoriaSchema = moongoose.Schema({
    nome:{type:String, unique:true},
    status:{type:String, enum:['ativo','inativo'], default:'ativo'},
    foto:{
        originaName:{type:String},
        path:{type:String},
        size:{type:Number},
        mimeType:{type:String}
    }
},{timestamps:true})

module.exports=moongoose.model('categoria',CategoriaSchema)
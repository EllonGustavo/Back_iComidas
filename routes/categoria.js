const express = require('express')
const router = express.Router()
const Categoria = require('../model/Categoria')

/*******************
 Lista todas as categorias
 get /categorias
 *******************/

 router.get('/', async(req,res)=>{
     try{
         const categorias = await Categoria.find({'status':'ativo'}).sort({nome:1})
         res.json(categorias)
     }catch(err){
         res.status(500).send({
            errors:[{message: "Não foi possivel obter as categorias!"}]
         })
     }
 })

 module.exports = router
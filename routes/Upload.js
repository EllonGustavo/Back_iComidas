const express = require('express')
const router = express.Router()
const multer = require('multer')

//Definindo a pasta padrão de upload
const upload = multer({
    dest:'./public/uploads'
})

/**
 * POST /uploads
 * salva a imagem recebida via upload
 */
router.post('/',upload.array('file'),
async(req,res)=>{
    console.log(`arquivos recebidos: ${req.files.length}`)
    const statusUpload = req.files.length>0? false:true
    res.send({
        upload:statusUpload,
        files:req.files
    })
})

module.exports = router
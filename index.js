const express = require('express')
require('dotenv').config()//Carrega as variaveis de ambiente
const InicializaMongoServer = require('./config/db')
const RotasDaCategoria = require('./routes/categoria')

//inicialiamos o mongoDB
InicializaMongoServer()

const app = express()

const PORT = process.env.PORT
//Parse conteudo JSON
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API iComida 100% funcional',
        versao: '1.0.0',
    })
})

/**Rotas da categoria */

app.use('/categorias',RotasDaCategoria)

app.get('/fatec', (req, res) => {
    res.json({
        mensagem: 'API iComida 100% funcional',
        versao: '1.1.1',
    })
})

app.listen(PORT,(req, res)=>{
    console.log(`Servidor web iniciado na porta ${PORT}`)
})
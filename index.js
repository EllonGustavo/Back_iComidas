//requisita o express
const express = require('express')
require('dotenv').config()//carrega as variaveis do ambiente
const InicializaMongoServer = require('./config/db')

//Definindo as rotas do backend
const rotasDaCategoria = require('./routes/Categoria')
const rotasUpload = require('./routes/Upload')
//inicializa mongo server
InicializaMongoServer()

//inicia o express
const app = express()

//removendo o x-powerred-by por segurança
app.disable('x-powered-by')

//Porta default do backend
const PORT = process.env.PORT || 4000

//Middleware do express
app.use(function(req, res, next){
    //Em produção, remova o * e atualize com o domínio/ip do seu app
    res.setHeader('Access-Control-Allow-Origin', '*')
    //Cabeçalhos que serão permitidos
    res.setHeader('Access-Control-Allow-Headers','*')
    //Ex: res.setHeader('Access-Control-Allow-Headers','Content-Type, Accept, access-token')
    //Métodos que serão permitidos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
    next()
})

//definimos que o backend fara o parse do json
app.use(express.json())

//definimos a nossa primeira rota
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API 100% funcional!👏',
        versao: '1.0.2'
    })
})

//Rotas das Categorias
app.use('/categorias',rotasDaCategoria)
//Rotas de Upload
app.use('/upload',rotasUpload)

//Rota para tratar erros 404(sempre deve ser a ultima)
app.use(function(req,res) {
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

app.listen(PORT, (req, res) => {
    console.log(`💻 Servidor web rodando na porta ${PORT}`)
})
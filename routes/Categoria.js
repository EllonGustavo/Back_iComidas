const expresss = require('express')
const router = expresss.Router()
const { check, validationResult } = require('express-validator')

const Categoria = require('../model/Categoria')

/**
 * GET /categorias
 * Lista todas as categorias
 */

router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.find()
        res.json(categorias)
    } catch (err) {
        res.status(500).send({
            errors: [{ message: 'Não foi possivel obter as categorias!' }]
        })
    }
})

/**
 * GET /categorias/:id
 * Lista categorias pelo id
 */
router.get('/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id)
        res.json(categoria)
    } catch (err) {
        res.status(500).send({
            errors: [{ message: `Não foi possivel obter a categoria com id:${req.params.id}` }]
        })
    }
})

/**
 * POST /categorias/
 * inclui uma nova categoria
 */
const validaCategoria = [
    check('nome', 'Nome da categoria é obrigatorio').not().isEmpty(),
    check('status', 'Informe um status valido para a categoria').isIn(['ativo', 'inativo'])
]
router.post('/', validaCategoria, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    //verifica se a categoria já existe
    const { nome } = req.body
    let categoria = await Categoria.findOne({ nome })
    if (categoria)
        return res.status(200).json({
            errors: [{ message: 'já existe uma categoria com o nome informado' }]
        })
    try {
        let categoria = new Categoria(req.body)
        await categoria.save()
        res.send(categoria)
    } catch (err) {
        return res.status(500).json({
            errors: [{ message: `error ao salvar a categoria:${err.message}` }]
        })
    }
})

/**
 * DELETE /categorias/:id
 * apaga a categoria por id
 */
router.delete('/:id', async (req, res) => {
    await Categoria.findByIdAndRemove(req.params.id)
        .then(categoria => {
            res.send(
                { message: `Categoria ${categoria.nome} removida com sucesso` }
            )
        }).catch(err => {
            return res.status(500).send(
                {
                    errors:
                        [{ message: `Não foi passivel apagar a categoria com o id ${req.params.id}` }]
                }
            )
        })
})

/**
 * PUT /categorias
 * altera os dados da categoria informada
 */
router.put('/', validaCategoria,
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        let dados = req.body
        await Categoria.findByIdAndUpdate(req.body._id, {
            $set: dados
        }, { new: true })
            .then(categoria => {
                res.send({ message: `Categoria ${categoria.nome} alterado com sucesso!` })
            }).catch(err => {
                return res.status(500).send({
                    errors: [{
                        message: `Não foi possivel alterar a categoria com o id ${req.body._id}`
                    }]
                })
            })
    }
)

module.exports = router
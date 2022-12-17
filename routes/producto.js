const { Router } = require("express");
const { check } = require("express-validator");
const { existeModelo, noexisteModelo, existeidModelo } = require("../helpers/validarModelo");
const { validarJWT } = require("../middlewares/validar-jwt");
const producto = require("../models/producto");
const Categoria = require("../models/categoria");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearProducto, editarProducto, productoDisponible, eliminarPermanente, listarProductos, productoxid } = require("../controllers/producto");
const router = Router()
router.post('/',
    [
        validarJWT,
        check('nombre', 'el nombre es obligatorio').notEmpty(),
        check('nombre').custom((nombre) => existeModelo(nombre, 'nombre', producto)),
        check('categoria', 'la categoria es requerida').notEmpty(),
        check('categoria').custom((categoria) => existeidModelo(categoria, Categoria)),//aca busca por id no lo toma como tal
        validarCampos
    ],
    crearProducto)
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'el nombre es obligatorio').notEmpty(),
        check('nombre').custom((nombre) => existeModelo(nombre, 'nombre', producto)),
        check('categoria', 'la categoria es requerida').notEmpty(),
        check('categoria').custom((categoria) => noexisteModelo(categoria, 'categoria', Categoria)),
        validarCampos
    ],
    editarProducto
)
router.put('/disponible/:id',
    [
        validarJWT,
        check('id', 'el es requerido').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        check('disponible', 'el campo es obligatorio').notEmpty(),
        validarCampos
    ],
    productoDisponible)
router.delete('/',
    [
        validarJWT,
        check('id', 'el es requerido').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        validarCampos
    ],
    eliminarPermanente)
router.get('/listar/:desde/:limite',
    [
        validarJWT,
        validarCampos
    ],
    listarProductos)
router.get('/id/:id', [],
    productoxid)
module.exports = router
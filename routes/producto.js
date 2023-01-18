const { Router } = require("express");
const { check } = require("express-validator");
const { existeModelo, noexisteModelo, existeidModelo } = require("../helpers/validarModelo");
const { validarJWT } = require("../middlewares/validar-jwt");
const producto = require("../models/producto");
const Categoria = require("../models/categoria");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearProducto, editarProducto, productoDisponible, eliminarPermanente, listarProductos, productoxid, listarProductosPublic } = require("../controllers/producto");
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
        check('nombre').custom((nombre) => existeModelo(nombre, 'nombre', producto)),
        check('categoria', 'la categoria es requerida').notEmpty(),
        check('categoria').custom((categoria) => existeidModelo(categoria, Categoria)),
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
router.delete('/:id',
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
router.get('/listarPublico/:desde/:limite',
    [
        check('desde', 'el campo desde es obligatorio').notEmpty(),
        check('limite', 'el campo limite es obligatorio').notEmpty(),
        validarCampos
    ],
    listarProductosPublic)
router.get('/id/:id', [
    check('id', 'El id es obligatorio').notEmpty(),
    check('id', 'El id debe tener el formato correcto').notEmpty(),
    validarCampos
],
    productoxid)
module.exports = router
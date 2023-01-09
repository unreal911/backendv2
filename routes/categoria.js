const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria, actualizarCategoria, actualizarEstado, eliminarPermanente, listarCategorias } = require("../controllers/categoria");
const { existeModelo } = require("../helpers/validarModelo");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const categoria = require("../models/categoria");
const router = Router()
router.post('/',
    [
        validarJWT,
        check('nombre', 'el nombre es obligatorio').notEmpty(),
        check('nombre').custom((nombre) => existeModelo(nombre, 'nombre', categoria)),
        validarCampos
    ],
    crearCategoria)

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'el nombre es obligatorio').notEmpty(),
        check('nombre').custom((nombre) => existeModelo(nombre, 'nombre', categoria)),
        validarCampos
    ],
    actualizarCategoria)
router.put('/estado/:id',
    [
        validarJWT,
        check('estado', 'el estado es requerido').notEmpty(),
        validarCampos

    ],
    actualizarEstado)
router.delete('/:id',
    [
        validarJWT,
        check('id', 'el id debe ser obligatorio').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        validarCampos
    ],
    eliminarPermanente)
router.get('/listar/:desde/:limite',
    [
        validarJWT,
        validarCampos
    ],
    listarCategorias)
module.exports = router
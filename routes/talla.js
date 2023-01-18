const { Router } = require("express");
const { check } = require("express-validator");
const { crearTalla, actualizarTalla, actualizarEstadoTalla, eliminarTalla, getTallaid, getTallasPublic, getTallas } = require("../controllers/utilidades");
const { existeModelo } = require("../helpers/validarModelo");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');
const talla = require("../models/talla");
const router = Router()
router.post('/',
    [
        validarJWT,

        check('codigo', 'El codigo es requerido').notEmpty(),
        check('nombre', 'El nombre requerido').notEmpty(),
        check('nombre').custom((nombre) => existeModelo(nombre, 'nombre', talla)),
        check('codigo').custom((codigo) => existeModelo(codigo, 'codigo', talla)),
        validarCampos
    ]
    ,
    crearTalla)
router.put('/:id',
    [
        validarJWT,
        check('nombre').custom((nombre) => existeModelo(nombre, 'nombre', talla)),
        check('codigo').custom((codigo) => existeModelo(codigo, 'codigo', talla)),
        check('id', 'El id Es obligatorio').notEmpty(),
        check('id', 'El id debe ser valido').isMongoId(),
        validarCampos
    ]
    ,
    actualizarTalla
)
router.put('/estado/:id',
    [
        validarJWT,
        check('id', 'El id Es obligatorio').notEmpty(),
        check('id', 'El id debe ser valido').isMongoId(),
        check('estado', 'El estado es requerido').notEmpty(),
        validarCampos
    ],
    actualizarEstadoTalla)

router.get('/public',
    [


    ],
    getTallasPublic
)
router.get('/:id',
    [
        validarJWT,
        check('id', 'El id Es obligatorio').notEmpty(),
        check('id', 'El id debe ser valido').isMongoId(),
        validarCampos
    ]
    ,
    getTallaid)
router.get('/',
    [
        validarJWT,
        validarJWT
    ]
    ,
    getTallas
)

router.delete('/:id',
    [
        validarJWT,
        check('id', 'El id Es obligatorio').notEmpty(),
        check('id', 'El id debe ser valido').isMongoId(),
        validarCampos
    ]
    ,
    eliminarTalla)
module.exports = router
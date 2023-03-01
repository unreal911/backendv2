const { Router } = require("express");
const { check } = require("express-validator");
const { crearPedido, pedidoxid, editarPedido, editarEstadoPedido, listarPedidos, editarPagado, eliminarPedido } = require("../controllers/Pedido");
const { existeModelo, noexisteModelo } = require("../helpers/validarModelo");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const categoria = require("../models/categoria");
const router = Router()
router.post('/',
    [
        check('telefono', 'el telefono es obligatorio').notEmpty(),
        check('nombre', 'el nombre es obligatorio').notEmpty(),
        check('departamento', 'el nombre es obligatorio').notEmpty(),
        check('direccion', 'la direccion es obligatoria').notEmpty(),
        check('correo', 'el correo es obligatoria').notEmpty(),
        validarCampos
    ],
    crearPedido)
router.get('/:id',
    [
        validarJWT,
        check('id', 'el id no debe de estar vacio').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        validarCampos
    ],
    pedidoxid

)
router.get('/listarPedidos/:desde/:limite',
    [
        validarJWT,
        validarCampos
    ],
    listarPedidos)
router.put('/:id',
    [
        validarJWT,
        check('id', 'el id no debe de estar vacio').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        validarCampos
    ],
    editarPedido)
router.put('/estado/:id',
    [
        validarJWT,
        check('id', 'el id no debe de estar vacio').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        check('estado', 'el estado no debe de estar vacio').notEmpty(),
        validarCampos
    ],
    editarEstadoPedido
)
router.put('/pagado/:id',
    [
        validarJWT,
        check('id', 'el id no debe de estar vacio').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        check('pagado', 'el id no debe de estar vacio').notEmpty(),
        validarCampos
    ],
    editarPagado)
router.delete('/:id',
    [
        validarJWT,
        check('id', 'el id no debe de estar vacio').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        validarCampos
    ]
    , eliminarPedido)
module.exports = router
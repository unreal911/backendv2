const { Router } = require("express");
const { check } = require("express-validator");
const { crearDetallePedido, listarDetallePedidos, editarDetallePedido, eliminarDetallePedido, crearDetalleVenta } = require("../controllers/DetallePedido");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router()
router.post('/',
    [
        check('pedido', 'el id pedido es obligatorio').notEmpty(),
        check('pedido', 'el id debe ser valido').isMongoId(),
        check('producto', 'el id pedido es obligatorio').notEmpty(),
        check('producto', 'el id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearDetallePedido)

router.post('/dventa',
    [
        check('pedido', 'el id pedido es obligatorio').notEmpty(),
        check('pedido', 'el id debe ser valido').isMongoId(),
        check('producto', 'el id pedido es obligatorio').notEmpty(),
        check('producto', 'el id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearDetalleVenta)
router.put('/:id',
    [
        validarJWT,
        check('id', 'el id es obligatorio').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        check('pedido', 'el id debe ser valido').isMongoId(),
        validarCampos
    ],
    editarDetallePedido
)
router.get('/listar/:pedido/:desde/:limite',
    [
        validarJWT,
        check('pedido', 'el id es obligatorio').notEmpty(),
        check('pedido', 'el id debe ser valido').isMongoId(),
        validarCampos
    ],
    listarDetallePedidos)
router.delete('/:id', [
    validarJWT,
    validarCampos
],
    eliminarDetallePedido)
module.exports = router
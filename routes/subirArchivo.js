const { Router } = require("express");
const { check } = require("express-validator");
const { subirTests, subirArchivo, SubirMultiplesArchivos, eliminarimagen, cambiarPosicion } = require("../controllers/subirArchivo");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router()
router.get('/', [], subirTests)
router.post('/:coleccion/:id', [
    validarJWT,
    check('coleccion', 'la coleccion es requerida').notEmpty(),
    check('id', 'el id es requerido').notEmpty(),
    check('id', ' el id debe ser valido').isMongoId(),
    validarCampos
], subirArchivo)
router.post('/:id',
    [
        validarJWT,
        validarCampos
    ],
    SubirMultiplesArchivos)
router.delete('/:id', [
    validarJWT,
    validarCampos
], eliminarimagen)
router.put('/:id', [
    validarJWT,
    validarCampos
], cambiarPosicion)
module.exports = router
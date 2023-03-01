const { Router } = require("express");
const { GuardarSlider, editarSlider, eliminarSlider, listarSlider } = require("../controllers/slider");
const { eliminarImagenSlider } = require("../controllers/subirArchivo");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router()

router.post('/', [
    validarJWT,
    validarCampos
], GuardarSlider)
router.put('/:id', [
    validarJWT,
    validarCampos
], editarSlider)
router.delete('/:id', [
    validarJWT,
    validarCampos
], eliminarSlider)
router.get('/', [], listarSlider)
router.put('/eliminarimg', [
    validarJWT,
    validarCampos
], eliminarImagenSlider)
module.exports = router
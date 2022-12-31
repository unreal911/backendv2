const { Router } = require("express");
const { login, renovarToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()
router.post('/login', [], login)
router.get('/renovar', [
    validarJWT,
    validarCampos
], renovarToken)
module.exports = router
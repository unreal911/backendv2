const { Router } = require("express");
const { check } = require("express-validator");
const { usuariotest, crearUsuario, actualizarUsuario, actualizarpwd, listarUsuarios, actualizarRol, actualizarEstado } = require("../controllers/usuario");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router()
router.get('/tests', [], usuariotest)
router.get('/', [], listarUsuarios)
router.post('/', [], crearUsuario)
router.put('/:id', [], actualizarUsuario)
router.put('/actualizarpass/:id', [
    check('passwordNuevo', 'se necesita el nuevo password').notEmpty(),
    check('passwordAnt', 'Se requiere el passord actual').notEmpty(),
    validarCampos
], actualizarpwd)
router.put('/actualizarRol/:id', [], actualizarRol)
router.put('/actualizarEstado/:id', [], actualizarEstado)
module.exports = router
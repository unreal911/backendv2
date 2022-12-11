const { Router } = require("express");
const { check } = require("express-validator");
const { usuariotest, crearUsuario, actualizarUsuario, actualizarpwd, listarUsuarios, actualizarRol, actualizarEstado } = require("../controllers/usuario");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router()
router.get('/tests', [], usuariotest)
router.get('/:desde/:limite', [], listarUsuarios)
router.post('/', [
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    check('email', ' el email es requerido').notEmpty(),
    check('password', 'El password es requerido').notEmpty()
], crearUsuario)
router.put('/:id', [

], actualizarUsuario)
router.put('/actualizarpass/:id', [
    check('passwordNuevo', 'se necesita el nuevo password').notEmpty(),
    check('passwordAnt', 'Se requiere el passord actual').notEmpty(),
    validarCampos
], actualizarpwd)
router.put('/actualizarRol/:id', [
    check('id', 'el id es requerido').notEmpty(),
    check('rol', 'el rol es requerido').notEmpty()
], actualizarRol)
router.put('/actualizarEstado/:id', [

], actualizarEstado)
module.exports = router
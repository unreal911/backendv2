const { Router } = require("express");
const { check } = require("express-validator");
const { usuariotest, crearUsuario, actualizarUsuario, actualizarpwd, listarUsuarios, actualizarRol, actualizarEstado, eliminarUsuario } = require("../controllers/usuario");
const { existeModelo } = require("../helpers/validarModelo");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRol, validarAdminUsuario } = require("../middlewares/validar-rol");
const Usuario = require("../models/usuario");
const router = Router()
router.get('/tests', [], usuariotest)
router.get('/:desde/:limite', [], listarUsuarios)
router.post('/',
    [
        validarJWT,
        check('email').custom((email) => existeModelo(email, 'email', Usuario)),
        check('nombre', 'el nombre es obligatorio').notEmpty(),
        check('email', ' el email es requerido').notEmpty(),
        check('password', 'El password es requerido').notEmpty(),
        validarCampos
    ],
    crearUsuario)
router.put('/:id',
    [
        validarJWT,
        validarAdminUsuario,
        check('email').custom((email) => existeModelo(email, 'email', Usuario)),
        check('id', 'el id es requerido').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarUsuario)
router.put('/actualizarpass/:id',
    [
        validarJWT,
        validarAdminUsuario,
        check('id', 'el id es requerido').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        check('passwordNuevo', 'se necesita el nuevo password').notEmpty(),
        check('passwordAnt', 'Se requiere el passord actual').notEmpty(),
        validarCampos
    ],
    actualizarpwd)
router.put('/actualizarRol/:id',
    [
        validarJWT,
        esAdminRol,
        check('id', 'el id es requerido').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        check('rol', 'el rol es requerido').notEmpty(),
        check("rol", "No es un rol valido").isIn([
            "ADMIN_ROL",
            "USER_ROL",
            "DEV_ROL",
        ]),
        validarCampos
    ]
    , actualizarRol)
router.put('/actualizarEstado/:id',
    [
        validarJWT,
        esAdminRol,
        check('id', 'el id es requerido').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        check('id', 'el estado es requerido').notEmpty(),
        validarCampos
    ],
    actualizarEstado)
router.delete('/:id',
    [
        validarJWT,
        esAdminRol,
        check('id', 'el id es obligatorio').notEmpty(),
        check('id', 'el id debe ser valido').isMongoId(),
        validarCampos
    ],
    eliminarUsuario
)
module.exports = router
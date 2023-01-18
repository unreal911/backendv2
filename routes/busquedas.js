/*

    ruta: api/todo/
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')

const { getTodo, getDocumentosColeccion, getProductoxCategoria, getProductoPublic } = require('../controllers/busqueda');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.get('/:busqueda', validarJWT, getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);
router.get('/publico/coleccion/:tabla/:busqueda', [

    check('tabla','Solo se aceptan productos/categorias').isIn('productos','categorias'),
    check('busqueda', 'este campo es requerida').notEmpty(),
    validarCampos
],getProductoPublic );

router.get('/publico/:tabla', [
    check('tabla', 'el id no es valido').isMongoId(),
    check('tabla', 'La tabla es requerida').notEmpty(),
    validarCampos
], getProductoxCategoria);

module.exports = router;
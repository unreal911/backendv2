const { Router } = require("express");
const { GuardarSlider, editarSlider, eliminarSlider, listarSlider } = require("../controllers/slider");
const { eliminarImagenSlider } = require("../controllers/subirArchivo");
const router = Router()

router.post('/', [], GuardarSlider)
router.put('/:id', [], editarSlider)
router.delete('/:id', [], eliminarSlider)
router.get('/', [], listarSlider)
router.put('/eliminarimg', [], eliminarImagenSlider)
module.exports = router
const { Router } = require("express");
const { crearCategoria } = require("../controllers/categoria");
const router = Router()
router.post('/', [], crearCategoria)
module.exports = router
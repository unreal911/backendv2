const { Router } = require("express");
const { usuariotest } = require("../controllers/usuario");
const router = Router()
router.get('/', [], usuariotest)
module.exports = router
const { Router } = require("express");
const { subirTests, subirArchivo } = require("../controllers/subirArchivo");
const router = Router()
router.get('/',[],subirTests)
router.post('/:coleccion/:id',[],subirArchivo)
module.exports=router
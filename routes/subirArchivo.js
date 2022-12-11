const { Router } = require("express");
const { subirTests, subirArchivo } = require("../controllers/subirArchivo");
const router = Router()
router.get('/',[],subirTests)
router.post('/',[],subirArchivo)
module.exports=router
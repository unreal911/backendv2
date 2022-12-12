const { request, response } = require("express")
const Categoria = require("../models/categoria")

const crearCategoria = async (req = request, res = response) => {

    const { usuario, ...nuevaCategoria } = req.usuario
    nuevaCategoria.usuario = req.usuario.id
    //const categoriadb = new Categoria(nuevaCategoria)
    console.log(nuevaCategoria)
    res.json({
        ok: false,
        msg: ``,
        nuevaCategoria
    })

}
module.exports = {
    crearCategoria
}
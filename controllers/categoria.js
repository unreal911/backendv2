const { request, response } = require("express")
const Categoria = require("../models/categoria")

const crearCategoria = async (req = request, res = response) => {

    const { usuario, ...nuevaCategoria } = req.body
    nuevaCategoria.usuario = req.usuario._id
    const categoriadb = new Categoria(nuevaCategoria)
    await categoriadb.save()
    return res.json({
        ok: false,
        msg: `se creo la categoria correctamente`,
        categoria: categoriadb
    })

}
const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params
    const { usuario, ...nuevaCategoria } = req.body
    nuevaCategoria.usuario = req.usuario._id
    const categoriadb = await Categoria.findByIdAndUpdate(id, nuevaCategoria, { new: true })
    return res.json({
        ok: true,
        msg: `se actualizo la categoria correctamente`,
        categoria: categoriadb
    })
}
const actualizarEstado = async (req = request, res = response) => {
    const { id } = req.params
    const { usuario, ...nuevaCategoria } = req.body
    nuevaCategoria.usuario = req.usuario._id
    const categoriadb = await Categoria.findByIdAndUpdate(id, { estado: nuevaCategoria.estado }, { new: true })
    return res.json({
        ok: true,
        msg: `se actualizo la categoria correctamente`,
        categoria: categoriadb
    })
}
module.exports = {
    crearCategoria,
    actualizarCategoria,
    actualizarEstado
}
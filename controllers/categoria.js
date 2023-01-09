const { request, response } = require("express")
const Categoria = require("../models/categoria")

const crearCategoria = async (req = request, res = response) => {

    const { usuario, ...nuevaCategoria } = req.body
    nuevaCategoria.usuario = req.usuario._id
    const categoriadb = new Categoria(nuevaCategoria)
    await categoriadb.save()
    return res.json({
        ok: true,
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
const eliminarPermanente = async (req = request, res = response) => {
    const { id } = req.params
    const categoriadb = await Categoria.findByIdAndDelete(id)
    if (!categoriadb) {
        return res.status(404).json({
            ok: false,
            msg: `la categoria no existe`
        })
    }
    return res.json({
        ok: true,
        msg: `se elimino categoria`,
        categoria: categoriadb
    })
}
const listarCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.params;
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find().skip(Number(desde)).limit(Number(limite)),
    ]);
    res.json({
        total,
        categorias,
    });
};
module.exports = {
    crearCategoria,
    actualizarCategoria,
    actualizarEstado,
    eliminarPermanente,
    listarCategorias
}
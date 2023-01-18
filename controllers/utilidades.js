const { request, response } = require("express");
const talla = require("../models/talla");

const crearTalla = async (req = request, res = response) => {
    const talldb = new talla(req.body)
    await talldb.save()
    return res.json({
        ok: true,
        talla: talldb
    })

}
const actualizarTalla = async (req = request, res = response) => {
    const { id } = req.params
    const talladb = await talla.findByIdAndUpdate(id, req.body, { new: true })
    if (!talladb) {
        return res.status(404).json({
            ok: false,
            msg: `No se encontro el id`
        })
    }
    return res.json({
        ok: true,
        msg: 'se actualizo talla con exito',
        talla: talladb
    })

}
const eliminarTalla = async (req = request, res = response) => {
    const { id } = req.params
    const talladb = await talla.findByIdAndDelete(id)
    if (!talladb) {
        return res.status(404).json({
            ok: false,
            msg: `No se encontro el id`
        })
    }
    return res.json({
        ok: true,
        msg: 'se elimino talla con exito',
        talla: talladb
    })
}
const actualizarEstadoTalla = async (req = request, res = response) => {
    const { id } = req.params
    const { estado } = req.body
    const talladb = await talla.findByIdAndUpdate(id, { estado: estado }, { new: true })
    if (!talladb) {
        return res.status(404).json({
            ok: false,
            msg: `No se encontro el id`
        })
    }
    return res.json({
        ok: true,
        msg: 'se modifico talla con exito',
        talla: talladb
    })
}
const getTallas = async (req = request, res = response) => {
    const tabladb = await talla.find()
    return res.json({
        ok: true,
        tallas: tabladb
    })
}
const getTallasPublic = async (req = request, res = response) => {
    const tabladb = await talla.find({ estado: true })
    return res.json({
        ok: true,
        tallas: tabladb
    })
}
const getTallaid = async (req = request, res = response) => {
    const { id } = req.params
    const talladb = await talla.findById(id)
    if (!talladb) {
        return res.status(404).json({
            ok: false,
            msg: 'No se encontro la talla'
        })
    }
    return res.json({
        ok: true,
        talla: talladb
    })
}
module.exports = {
    crearTalla,
    actualizarTalla,
    eliminarTalla,
    actualizarEstadoTalla,
    getTallas,
    getTallasPublic,
    getTallaid
}
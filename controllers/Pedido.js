const { response, request } = require("express");
const DetallePedido = require("../models/DetallePedido");
const Pedido = require("../models/pedido");
const { ObjectId } = require('mongoose').Types;
const crearPedido = async (req = request, res = response) => {
    const { estado, ...nuevoBody } = req.body
    const pedido = new Pedido(nuevoBody)
    await pedido.save()
    return res.json({
        ok: true,
        msg: `Se creo el pedido satisfactoriamente`,
        pedido: pedido
    })
}
const editarPedido = async (req = request, res = response) => {
    const { id } = req.params
    const pedido = await Pedido.findByIdAndUpdate(id, req.body, { new: true })
    if (!pedido) {
        return res.status(404).json({
            ok: false,
            msg: `pedido no encontrado edit`
        })
    }
    return res.json({
        ok: true,
        msg: `pedido actualizado correctamente`,
        pedido
    })

}
const editarEstadoPedido = async (req = request, res = response) => {
    const { id } = req.params
    const { estado } = req.body
    const { usuario } = req.body
    const pedido = await Pedido.findByIdAndUpdate(id, { estado: estado,usuario:usuario }, { new: true })
    if (!pedido) {
        return res.status(404).json({
            ok: false,
            msg: `pedido no encontrado`
        })
    }
    return res.json({
        ok: true,
        msg: `pedido actualizado correctamente`,
        pedido
    })
}
const eliminarPedido = async (req = request, res = response) => {
    const { id } = req.params
    const pedido = await Pedido.findByIdAndDelete(id)
    if (!pedido) {
        return res.status(404).json({
            ok: false,
            msg: `pedido no encontrado`,

        })
    }
    const eliminarDetallePedido = await DetallePedido.deleteMany({ pedido: new ObjectId(id) })
    return res.json({
        ok: true,
        msg: `pedido Eliminado`,
        pedido,
        eliminarDetallePedido
    })
}
const listarPedidos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.params;
    const [total, pedidos] = await Promise.all([
        Pedido.countDocuments(),
        Pedido.find().skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
        total,
        pedidos
    });
};
const pedidoxid = async (req = request, res = response) => {
    const { id } = req.params
    const pedido = await Pedido.findById(id)
    if (!pedido) {
        return res.status(404).json({
            ok: false,
            msg: `pedido no encontrado`
        })
    }
    return res.json({
        ok: true,
        msg: `pedido encontrado`,
        pedido
    })
}
const editarPagado = async (req = request, res = response) => {

    const { id } = req.params
    const { pagado } = req.body
    const { usuario } = req.body
    const pedido = await Pedido.findByIdAndUpdate(id, { pagado: pagado,usuario:usuario }, { new: true })
    if (!pedido) {
        return res.status(404).json({
            ok: false,
            msg: `pedido no encontrado`
        })
    }
    return res.json({
        ok: true,
        msg: `pedido actualizado correctamente /Pagado/Nopagado`,
        pedido
    })
}
module.exports = {
    crearPedido,
    editarPedido,
    editarEstadoPedido,
    eliminarPedido,
    listarPedidos,
    pedidoxid,
    editarPagado
}
const { response, request } = require("express");
const DetallePedido = require("../models/DetallePedido");
const Producto = require("../models/producto");

const crearDetallePedido = async (req = request, res = response) => {
    const { estado, precio, subtotal, ...nuevoBody } = req.body
    const producto = await Producto.findById(nuevoBody.producto)
    nuevoBody.precio = producto.precio
    nuevoBody.subtotal = producto.precio * nuevoBody.cantidad
    nuevoBody.nombre = producto.nombre
    const now = new Date();
    const fiveHoursAgo = new Date(now.getTime() - (5 * 60 * 60 * 1000));
    nuevoBody.fecha=fiveHoursAgo
    const Dpedido = new DetallePedido(nuevoBody)
    await Dpedido.save()
    return res.json({
        ok: true,
        msg: `Se creo el DetallePedido satisfactoriamente`,
        Detallepedido: Dpedido
    })
}
const crearDetalleVenta = async (req = request, res = response) => {
    const { estado, subtotal, ...nuevoBody } = req.body
    nuevoBody.subtotal = nuevoBody.cantidad * nuevoBody.precio
    const producto = await Producto.findById(nuevoBody.producto)
    nuevoBody.nombre = producto.nombre
    const Dpedido = new DetallePedido(nuevoBody)
    await Dpedido.save()
    return res.json({
        ok: true,
        msg: `Se creo el DetallePedidoVenta satisfactoriamente`,
        Detallepedido: Dpedido
    })
}
const editarDetallePedido = async (req = request, res = response) => {
    const { id } = req.params
    if (req.body.producto) {
        const producto = await Producto.findById(req.body.producto)
        req.body.nombre = producto.nombre
    }
    if (req.body.precio) {
        const buscarPedido = await DetallePedido.findById(id)
        req.body.subtotal = buscarPedido.cantidad * req.body.precio
    }
    if (req.body.cantidad) {
        const buscarPedido = await DetallePedido.findById(id)
        req.body.subtotal = buscarPedido.precio * req.body.cantidad
    }
    const Dpedido = await DetallePedido.findByIdAndUpdate(id, req.body, { new: true })
    if (!Dpedido) {
        return res.status(404).json({
            ok: false,
            msg: `DetallePedido no encontrado`
        })
    }
    return res.json({
        ok: true,
        msg: `Detallepedido actualizado correctamente`,
        DetallePeddido: Dpedido
    })

}
const eliminarDetallePedido = async (req = request, res = response) => {
    const { id } = req.params
    const Dpedido = await DetallePedido.findByIdAndDelete(id)
    if (!Dpedido) {
        return res.status(404).json({
            ok: false,
            msg: `Detallepedido no encontrado`
        })
    }
    return res.json({
        ok: true,
        msg: `pedido Eliminado`,
    })
}
const listarDetallePedidos = async (req = request, res = response) => {
    const { pedido } = req.params
    const { limite = 5, desde = 0 } = req.params;
    const [total, DetallePedidos] = await Promise.all([
        DetallePedido.countDocuments({ pedido: pedido }),
        DetallePedido.find({ pedido: pedido }).skip(Number(desde)).limit(Number(limite)),//aádir filtro
    ]);

    res.json({
        total,
        DetallePedidos
    });
};

module.exports = {
    crearDetallePedido,
    editarDetallePedido,
    eliminarDetallePedido,
    listarDetallePedidos,
    crearDetalleVenta
}
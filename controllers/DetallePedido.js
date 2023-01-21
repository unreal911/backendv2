const { response, request } = require("express");
const DetallePedido = require("../models/DetallePedido");

const crearDetallePedido = async (req = request, res = response) => {
    const { estado, ...nuevoBody } = req.body
    const Dpedido = new DetallePedido(nuevoBody)
    await Dpedido.save()
    return res.json({
        ok: true,
        msg: `Se creo el pedido satisfactoriamente`,
        Detallepedido: Dpedido
    })
}
const editarDetallePedido = async (req = request, res = response) => {
    const { id } = req.params
    const Dpedido = await DetallePedido.findByIdAndUpdate(id, req.body, { new: true })
    if (!Dpedido) {
        return res.status(404).json({
            ok: false,
            msg: `pedido no encontrado`
        })
    }
    return res.json({
        ok: true,
        msg: `pedido actualizado correctamente`,
        DetallePeddido: Dpedido
    })

}
const eliminarDetallePedido = async (req = request, res = response) => {
    const { id } = req.params
    const Dpedido = await DetallePedido.findByIdAndDelete(id)
    if (!Dpedido) {
        return res.status(404).json({
            ok: false,
            msg: `pedido no encontrado`
        })
    }
    return res.json({
        ok: true,
        msg: `pedido Eliminado`,
    })
}
const listarDetallePedidos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.params;
    const [total, DetallePedidos] = await Promise.all([
        DetallePedido.countDocuments(),
        DetallePedido.find().skip(Number(desde)).limit(Number(limite)),//aádir filtro
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
    listarDetallePedidos
}
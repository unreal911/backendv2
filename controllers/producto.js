const { request, response } = require("express")
const Producto = require("../models/producto")

const crearProducto = async (req = request, res = response) => {
    const { usuario, ...nuevoBody } = req.body
    nuevoBody.usuario = req.usuario._id
    const productodb = new Producto(nuevoBody)
    await productodb.save()
    return res.json({
        ok: true,
        msg: `se creo el producto con exito`,
        producto: productodb
    })
}
const editarProducto = async (req = request, res = response) => {
    const { usuario, ...nuevoBody } = req.body
    const { id } = req.params
    nuevoBody.usuario = req.usuario._id
    const productodb = await Producto.findByIdAndUpdate(id, nuevoBody, { new: true })
    if (!productodb) {
        return res.status(404).json({
            ok: false,
            msg: `el producto no ha sido encontrado`
        })
    }
    return res.json({
        ok: true,
        msg: `producto actualizado correctamente`,
        producto: productodb
    })
}
const productoDisponible = async (req = request, res = response) => {
    const { disponible } = req.body
    const { id } = req.params
    const productodb = await Producto.findByIdAndUpdate(id, { disponible: disponible, usuario: req.usuario._id }, { new: true })
    if (!productodb) {
        return res.status(404).json({
            ok: false,
            msg: `el producto no ha sido encontrado`
        })
    }
    return res.json({
        ok: true,
        msg: `se cambio es estado de producto disponible`,
        producto: productodb
    })

}
const eliminarPermanente = async (req = request, res = response) => {
    const { id } = req.params
    const productodb = await Producto.findByIdAndDelete(id)
    if (!productodb) {
        return res.json({
            ok: false,
            msg: `el producto no existe`
        })
    }
    return res.json({
        ok: true,
        msg: `se elimino el producto`
    })
}
const listarProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.params;
    const [total, productos] = await Promise.all([
        Producto.countDocuments(),
        Producto.find().skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
        total,
        productos,
    });
};

const listarProductosPublic = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.params;
    const [total, productos] = await Promise.all([
        Producto.countDocuments(),
        Producto.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
        total,
        productos,
    });
};
const productoxid = async (req = request, res = response) => {
    const { id } = req.params
    const productodb = await Producto.findById(id)
    if (!productodb) {
        return res.status(404).json({
            ok: false,
            msg: `no se encontro producto`
        })
    }
    return res.json({
        ok: true,
        producto: productodb
    })
}
module.exports = {
    crearProducto,
    editarProducto,
    productoDisponible,
    eliminarPermanente,
    listarProductos,
    productoxid,
    listarProductosPublic
}
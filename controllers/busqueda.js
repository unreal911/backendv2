const { response } = require("express");
const Usuario = require("../models/usuario");
const Producto = require("../models/producto");
const Categoria = require("../models/categoria");
const talla = require("../models/talla");
const pedido = require("../models/pedido");
const getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");

    const [usuarios, categorias, productos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Categoria.find({ nombre: regex }),
        Producto.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        categorias,
        productos
    });
};

const getDocumentosColeccion = async (req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");

    let data = [];

    switch (tabla) {
        case "categorias":
            data = await Categoria.find({ nombre: regex })
                .populate("usuario", "nombre img")
            break;

        case "productos":
            data = await Producto.find({ nombre: regex }).populate(
                "usuario",
                "nombre img"
            );
            break;

        case "usuarios":
            data = await Usuario.find({ nombre: regex });

            break;
        case "tallas":
            data = await talla.find({ codigo: regex });

            break;
        case "pedidos":
            data = await pedido.find({ nombre: regex });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: "La tabla tiene que ser usuarios/categorias/productos/pedidos",
            });
    }

    res.json({
        ok: true,
        resultados: data,
    });
};

const getProductoPublic = async (req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");

    let data = [];

    switch (tabla) {
        case "categorias":
            data = await Categoria.find({ nombre: regex })
                .populate("usuario", "nombre img")
            break;

        case "productos":
            data = await Producto.find({ nombre: regex }).populate(
                "usuario",
                "nombre img"
            );
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: "La tabla tiene que ser usuarios/categorias/productos",
            });
    }

    res.json({
        ok: true,
        resultados: data,
    });
};
const getProductoxCategoria = async (req, res = response) => {
    const { tabla } = req.params
    const productodb = await Producto.find({ categoria: tabla })
    if (!productodb) {
        return res.status(404).json({
            ok: false,
            msg: 'categoria no entrada'
        })
    }
    return res.json({
        ok: true,
        productos: productodb
    })
}
module.exports = {
    getTodo,
    getDocumentosColeccion,
    getProductoxCategoria,
    getProductoPublic
};

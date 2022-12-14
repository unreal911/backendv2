const { response } = require("express");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");

    const [usuarios] = await Promise.all([
        Usuario.find({ nombre: regex }),
        /*  Medico.find({ nombre: regex }),
            Hospital.find({ nombre: regex }),*/
    ]);

    res.json({
        ok: true,
        usuarios,
        /*   medicos,
            hospitales*/
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
                .populate("hospital", "nombre img");
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

module.exports = {
    getTodo,
    getDocumentosColeccion,
};

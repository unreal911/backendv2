const { response, request } = require("express");
const Usuario = require("../models/usuario");
const Producto = require("../models/producto");
const Categoria = require("../models/categoria");
const talla = require("../models/talla");
const pedido = require("../models/pedido");
const moment = require('moment');
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
const getFiltro = async (req = request, res = response) => {
    const filtro = req.body
    if (filtro.tipoventa.$in.length == 0) {
        delete filtro.tipoventa
    }
    if (filtro.pagado.$in.length == 0) {
        delete filtro.pagado
    }
    if (filtro.fecha.$gte == '' && filtro.fecha.$lte == '') {
        delete filtro.fecha
    }
    //  const pedido = await pedido.find()
    console.log(filtro)
    const filtrarPedido = await pedido.find(filtro)
    return res.json(
        {
            filtrarPedido
        }
    )
}
const MostrarventaSemanaDia = async (req = request, res = response) => {
    const { fechaInicio, fechaFin } = req.body;
    let finfecha = new Date(fechaFin)
    finfecha.setDate(finfecha.getDate() + 1)
    const pipeline = [
        {
            $match: {
                fecha: { $gte: new Date(fechaInicio), $lte: finfecha }
            }
        },
        {
            $group: {
                _id: {
                    dia: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
                    tipoventa: "$tipoventa"
                },
                totalPedidos: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: "$_id.dia",
                ventas: {
                    $push: {
                        tipoventa: "$_id.tipoventa",
                        totalPedidos: "$totalPedidos"
                    }
                }
            }
        }
    ];
    const resultados = await pedido.aggregate(pipeline);
    let arrayRespuesta = []
    for (let i = 0; i < resultados.length; i++) {
        const element = resultados[i];
        arrayRespuesta.push({
            fecha: resultados[i]._id,
            ventas: resultados[i].ventas
        })
    }
    console.log(arrayRespuesta)
    return res.json({
        resultados: arrayRespuesta
    })
}
const obtenerUsuariosConPedidos = async (req = request, res = response) => {
    const pedidosPorDia = await pedido.aggregate([
        {
            $match: {
                fecha: {
                    $gte: new Date(moment().startOf('day').toISOString()),
                    $lt: new Date(moment().endOf('day').toISOString()),
                },
            },
        },
        {
            $group: {
                _id: '$usuario',
                pedidos: { $sum: 1 },
            },
        },
    ]);

    const pedidosPorSemana = await pedido.aggregate([
        {
            $match: {
                fecha: {
                    $gte: new Date(moment().startOf('week').toISOString()),
                    $lt: new Date(moment().endOf('week').toISOString()),
                },
            },
        },
        {
            $group: {
                _id: '$usuario',
                pedidos: { $sum: 1 },
            },
        },
    ]);

    const pedidosPorMes = await pedido.aggregate([
        {
            $match: {
                fecha: {
                    $gte: new Date(moment().startOf('month').toISOString()),
                    $lt: new Date(moment().endOf('month').toISOString()),
                },
            },
        },
        {
            $group: {
                _id: '$usuario',
                pedidos: { $sum: 1 },
            },
        },
    ]);

    const usuarios = await Usuario.find().select('nombre img uid');

    const usuariosConPedidos = usuarios.map(usuario => {
        const pedidosHoy = pedidosPorDia.find(pedido => pedido._id.toString() === usuario._id.toString())?.pedidos || 0;
        const pedidosSemana = pedidosPorSemana.find(pedido => pedido._id.toString() === usuario._id.toString())?.pedidos || 0;
        const pedidosMes = pedidosPorMes.find(pedido => pedido._id.toString() === usuario._id.toString())?.pedidos || 0;
        return {
            uid: usuario._id,
            img: usuario.img,
            nombre: usuario.nombre,
            pedidosHoy,
            pedidosSemana,
            pedidosMes,
        };
    });
    res.json({
        usuariosConPedidos
    })
};
const pedidosxusuario = async (req = request, res = response) => {
    const { id } = req.body
    const pedidosuser = await pedido.find({ usuario: id })
    if (!pedidosuser) {
        return res.status(404).json({
            ok: false,
            msg: `usuario no encontrado`
        })
    }
    return res.json({
        ok: true,
        pedidos: pedidosuser
    })
}
module.exports = {
    getTodo,
    getDocumentosColeccion,
    getProductoxCategoria,
    getProductoPublic,
    getFiltro,
    MostrarventaSemanaDia,
    obtenerUsuariosConPedidos,
    pedidosxusuario
};

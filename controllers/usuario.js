const { compareSync } = require("bcryptjs")
const { response, request } = require("express")
const { generarpwd } = require("../helpers/generarpwd")
const Usuario = require("../models/usuario")
const usuariotest = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: `estas en el usuario test`
    })
}
const listarUsuarios = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.params;
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find().skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
        total,
        usuarios,
    });
};
const crearUsuario = async (req = request, res = response) => {
    const { estado, password, ...nuevoBody } = req.body
    if (password == undefined || nuevoBody.email == undefined || nuevoBody.nombre == undefined) {
        return res.status(415).json({
            ok: false,
            msg: `el password esta en undefined`
        })
    }
    
    const nuevoPassword = await generarpwd(password)
    nuevoBody.password = nuevoPassword
    const usuariodb = new Usuario(nuevoBody)
    usuariodb.save()
    return res.json({
        ok: true,
        result: usuariodb,
        msg: `usuario creado exitosamente`
    })
}
const actualizarUsuario = async (req = request, res = response) => {
    const { estado, password, ...nuevoBody } = req.body
    const { id } = req.params
    const usuariodb = await Usuario.findByIdAndUpdate(id, nuevoBody, { new: true })
    console.log(id)
    if (!usuariodb) {
        return res.status(404).json({
            ok: false,
            msg: `usuario no encontrado`
        })
    }
    return res.json({
        ok: true,
        result: usuariodb,
        msg: `usuario actualizado correctamente`
    })
}
const actualizarpwd = async (req = request, res = response) => {
    const { passwordNuevo, passwordAnt } = req.body
    const { id } = req.params
    console.log(id)
    const usuariodb = await Usuario.findById(id)
    console.log(usuariodb)
    if (!usuariodb) {
        return res.status(404).json({
            ok: false,
            msg: `No se encontro el usuario`
        })
    }
    const pwdIguales = compareSync(passwordAnt, usuariodb.password)
    if (!pwdIguales) {
        return res.status(400).json({
            ok: false,
            msg: `el password no coincide`
        })
    }
    let genpwd = await generarpwd(passwordNuevo)
    const updatePWD = await Usuario.findByIdAndUpdate(id, { password: genpwd }, { new: true })
    return res.json({
        ok: true,
        msg: `Se actualizo el password correctamente`
    })
}
const actualizarRol = async (req = request, res = response) => {
    const { rol } = req.body
    const { id } = req.params
    const updateRol = await Usuario.findByIdAndUpdate(id, { rol: rol }, { new: true })
    if (!updateRol) {
        return res.json({
            ok: false,
            msg: `No se encontrol el usuario`
        })
    }
    return res.json({
        ok: true,
        result: updateRol,
        msg: `se actualizo el rol correctamente`
    })
}
const actualizarEstado = async (req = request, res = response) => {
    const { estado } = req.body
    const { id } = req.params
    const usuariodb = await Usuario.findByIdAndUpdate(id, { estado: estado }, { new: true })
    if (!usuariodb) {
        return res.status(404).json({
            ok: false,
            msg: 'usuario no encontrado'
        })
    }
    return res.json({
        ok: true,
        msg: `usuario actualizado correctamente`,
        result: usuariodb
    })
}
const eliminarUsuario= async(req=request,res=response)=>{
    const {id}=req.params
    const usuariodb= await Usuario.findByIdAndDelete(id)
    if(!usuariodb){
        return res.status(404).json({
            ok:false,
            msg:`No se encontro el usuario`
        })
    }
    return res.json({
        ok:true,
        msg:`Se elimino usuario correctamente`
    })
}
module.exports = {
    usuariotest,
    crearUsuario,
    actualizarUsuario,
    actualizarpwd,
    listarUsuarios,
    actualizarRol,
    actualizarEstado,
    eliminarUsuario
}
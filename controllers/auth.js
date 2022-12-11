const { request, response } = require("express")
const bcryptjs = require('bcryptjs')
const Usuario = require("../models/usuario")
const { generarJWT } = require("../helpers/generarjwt")

const login = async (req = request, res = response) => {
    const { email, password } = req.body
    try {
        const usuariodb = await Usuario.findOne({ email: email })
        if (!usuariodb) {
            return res.status(404).json({
                ok: false,
                msg: `no existe el email ${email} en la base de datos`
            })
        }
        if (!usuariodb.estado) {
            return res.status(409).json({
                ok: false,
                msg: `Usted no esta autorizado para acceder a este sitio`
            })
        }
        const validPassword = bcryptjs.compareSync(password, usuariodb.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es correcto'
            });
        }
        const token = await generarJWT(usuariodb.id)
        return res.json({
            ok: true,
            msg: `te logueaste correctamente`,
            token,
            usuario: usuariodb
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: `Error hable con el administrador`
        })
    }
}

const renovarToken = async (req = request, res = response) => {
    const id = req.usuario.id
    const usuario = req.usuario
    const token = await generarJWT(id)
    res.json({
      ok: true,
      msg: 'Estas en el renovar token',
      token,
      usuario
    })
  }
module.exports = {
    login,
    renovarToken
}
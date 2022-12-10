const { response, request } = require("express")

const usuariotest = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: `estas en el usuario test`
    })
}
module.exports = {
    usuariotest
}
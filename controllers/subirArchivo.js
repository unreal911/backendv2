const { request, response } = require("express")
const Usuario = require("../models/usuario")
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const subirTests = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: `estas en subit archivo`
    })
}
const subirArchivo = async (req = request, res = response) => {
    const { id, coleccion } = req.params;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }
    if (modelo.img.public_id) {
        await cloudinary.uploader.destroy(modelo.img.public_id);
    }
    const { tempFilePath } = req.files.img
    const { secure_url, public_id } = await cloudinary.uploader.upload(tempFilePath, { folder: coleccion });
    modelo.img = { secure_url, public_id };
    modelo.save()
    res.json({
        ok: true,
        msg: `estas en subit archivo`,
        modelo
    })
}
module.exports = {
    subirTests,
    subirArchivo
}
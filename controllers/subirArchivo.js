const { request, response } = require("express")
const Usuario = require("../models/usuario")
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );
const subirTests = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: `estas en subit archivo`
    })
}
const subirArchivo = async (req = request, res = response) => {
    const archivos = req.files
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const { tempFilePath } = req.files.img
    const cloudinaryimg = await cloudinary.uploader.upload( tempFilePath );
    console.log(archivos)
    res.json({
        ok: true,
        msg: `estas en subit archivo`,
        cloudinaryimg
    })
}
module.exports = {
    subirTests,
    subirArchivo
}
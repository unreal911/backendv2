const { request, response } = require("express");
const Producto = require("../models/producto");
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
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
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
const SubirMultiplesArchivos = async (req = request, res = response) => {
    const { id } = req.params;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const productodb = await Producto.findById(id);
    if (!productodb) {
        return res.status(400).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
    //tempFilePath
    const archivo = req.files.img
    if (archivo.length) {
        let updateProducto
        for (let i = 0; i < archivo.length; i++) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(archivo[i].tempFilePath, { folder: 'productos' });

            updateProducto = await Producto.findByIdAndUpdate(id, {
                $push: {
                    img: {
                        id: public_id,
                        url: secure_url
                    }
                }
            }, { new: true })
        }
        return res.json({
            ok: true,
            msg: `se actualizo productos correctamente`,
            producto: updateProducto
        })

//probar este codigo en postman
    } else {
        const { secure_url, public_id } = await cloudinary.uploader.upload(archivo.tempFilePath, { folder: 'producto' });
        const updateProducto = await Producto.findByIdAndUpdate(id, {
            $push: {
                img: {
                    id: public_id,
                    url: secure_url
                }
            }
        }, { new: true })
        return res.json({
            ok: true,
            msg: `se subio imagen correctamente`,
            producto: updateProducto
        })
    }


}
const eliminarimagen = async (req = request, res = response) => {
    const { id } = req.params
    const { imgId } = req.body
    const productodb = await Producto.findByIdAndUpdate(id, { $pull: { img: imgId } })
    await cloudinary.uploader.destroy(imgId, (err, result) => {
        if (err) {
            console.log('hubo un error', err)
        } else {
            console.log('imagen eliminada')
        }
    })
    return res.json({
        ok: true,
        msg: `se elimino imagen correctamente`,
        productodb
    })
}
module.exports = {
    subirTests,
    subirArchivo,
    SubirMultiplesArchivos,
    eliminarimagen
}
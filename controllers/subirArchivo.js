const { request, response } = require("express");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario")
const { ObjectId } = require('mongodb');
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
    console.log(coleccion)
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
    const { img } = req.body
    console.log(img, id)
    const productodb = await Producto.findByIdAndUpdate(id, { $pull: { img: { id: img } } }, { new: true })
    await cloudinary.uploader.destroy(img, (err, result) => {
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
const cambiarPosicion = async (req = request, res = response) => {
    // Obtiene el ID del producto y las posiciones a intercambiar de la solicitud
    const { id } = req.params;
    const { after, before } = req.body;

    // Convierte el ID a un objeto ObjectId de MongoDB
    const objectId = ObjectId(id);

    // Obtiene el documento y guarda los elementos a intercambiar en variables temporales
    Producto.findOne({ _id: objectId }, function (err, producto) {
        if (err) {
            res.status(500).send(err);
        } else {
            // Intercambia los elementos del array
            const temp1 = producto.img[before];
            const temp2 = producto.img[after];
            producto.img[before] = temp2;
            producto.img[after] = temp1;

            // Actualiza el documento
            Producto.findOneAndUpdate({ _id: objectId }, {
                $set: { img: producto.img }
            }, function (err, result) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send({ message: 'Elementos intercambiados' });
                }
            });
        }
    });
    //console.log(productodb)
}
module.exports = {
    subirTests,
    subirArchivo,
    SubirMultiplesArchivos,
    eliminarimagen,
    cambiarPosicion
}
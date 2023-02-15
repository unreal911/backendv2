const { request, response } = require("express")
const slider = require("../models/slider")
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const GuardarSlider = async (req = request, res = response) => {
    const sliderDB = new slider(req.body)
    await sliderDB.save()
    if (!sliderDB) {
        return res.status(404).json({
            ok: false,
            msg: `No fue grabado correctamente`
        })
    }
    return res.json({
        ok: true,
        msg: `Slider gravado`,
        slider: sliderDB
    })
}
const editarSlider = async (req = request, res = response) => {
    const sliderDB = await slider.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!sliderDB) {
        return res.json(404).json({
            ok: false,
            msg: `El id no fue encontrado`
        })
    }
    return res.json({
        ok: true,
        msg: `Se edito Slider con exito`,
        slider: sliderDB
    })
}
const eliminarSlider = async (req = request, res = response) => {
    const sliderDB = await slider.findByIdAndDelete(req.params.id)
    if (!sliderDB) {
        return res.json(404).json({
            ok: false,
            msg: `El id no fue encontrado`
        })
    }
    await cloudinary.uploader.destroy(sliderDB.img.public_id, (err, result) => {
        if (err) {
            console.log('hubo un error', err)
        } else {
            console.log('imagen eliminada')
        }
    })
    return res.json({
        ok: true,
        msg: `Se elimino Slider con exito`,
        slider: sliderDB
    })
}
const listarSlider = async (req = request, res = response) => {
    const sliderDB = await slider.find()
    if (!sliderDB) {
        return res.json(404).json({
            ok: false,
            msg: `archivos vacios `
        })
    }
    return res.json({
        ok: true,
        msg: `Se Lista de sliders`,
        sliders: sliderDB
    })
}
module.exports = {
    GuardarSlider,
    editarSlider,
    eliminarSlider,
    listarSlider
}
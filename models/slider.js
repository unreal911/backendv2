const { Schema, model } = require('mongoose');

const sliderSchema = Schema({
    titulo: {
        type: String,
        default: '',
    },
    subtitulo: {
        type: String,
        default: '',
    },
    botonproducto: {
        type: Object,
        default: {
            textbtn: 'Comprar',
            urlbtn: '/',
            visible: false
        },
    },
    img: {
        type: Object,
        default: {
            public_id: '',
            securel_url: ''
        }
    },
    estado: {
        type: Boolean,
        default: true
    }
});

sliderSchema.methods.toJSON = function () {
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id
    return data;
}


module.exports = model('Slider', sliderSchema);

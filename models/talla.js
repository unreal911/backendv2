const { Schema, model } = require('mongoose');

const tallaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    codigo: {
        type: String,
        default: '',
        required: true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    }
});


tallaSchema.methods.toJSON = function () {
    const { __v, _id, ...data } = this.toObject();
    data.uid = _id
    return data;
}


module.exports = model('Talla', tallaSchema);

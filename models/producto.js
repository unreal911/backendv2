const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  talla: {
    type: Array,
    default: []

  },
  fecha:{
    type:Date
  },
  descripcion: { type: String, default: 'Sin descripcion' },
  disponible: { type: Boolean, defult: true, required: true },
  img: {
    type: Array,
    default: [],
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, _id, estado, ...data } = this.toObject();
  data.uid = _id
  return data;
};

module.exports = model("Producto", ProductoSchema);

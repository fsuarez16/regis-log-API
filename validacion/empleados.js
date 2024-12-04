const conexionMongo = require("mongoose");

const esquemaEmpleado = new conexionMongo.Schema({
  id: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
  },
  celular: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
  activo: {
    type: Boolean,
    required: true,
  },
});

module.exports = conexionMongo.model("empleados", esquemaEmpleado);

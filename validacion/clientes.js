const conexionMongo = require("mongoose");

const esquemaClientes = new conexionMongo.Schema({
  _id: {
    type: Number,
    required: true,
  },
  idEmpleado: {
    type: Number,
    required: true,
  },
  nombreCliente: {
    type: String,
    required: true,
  },
  habitacion: {
    type: String,
    required: true,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});
module.exports = conexionMongo.model("clientes", esquemaClientes);

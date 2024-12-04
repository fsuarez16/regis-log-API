const express = require("express");
const empleadosControlador = require("./controlador/empleadosControlador");
const clientesControlador = require("./controlador/clientesControlador");
const rutasHttp = express.Router();

//POST Clientes
rutasHttp.post("/Cliente", clientesControlador.crearCliente);

//GET Clientes
rutasHttp.get("/Clientes", clientesControlador.listaClientes);

//PUT Cliente
rutasHttp.put("/Cliente/:id", clientesControlador.editarCliente);

//DELETE Cliente
rutasHttp.delete("/Cliente/:id", clientesControlador.borrarCliente);

//POST Empleado
rutasHttp.post("/Empleado", empleadosControlador.crearEmpleado);

//GET Empleados
rutasHttp.get("/Empleados", empleadosControlador.listaEmpleados);

//PUT Empleado
rutasHttp.put("/Empleado/:id", empleadosControlador.editarEmpleado);

//Get home
rutasHttp.get("/", (req, res) => {
  res.send("Home");
});

module.exports = rutasHttp;

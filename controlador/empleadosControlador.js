const empleado = require("../validacion/empleados");

class empleadoControlador {
  async crearEmpleado(req, res) {
    try {
      const datos = await empleado.create(req.body);
      return res.json(datos);
    } catch (error) {
      res.status(500).send({
        message: error.message || "[INFO] ERROR",
      });
    }
  }

  async listaEmpleados(req, res) {
    const nombre = req.query.nombre;
    var condicion = nombre
      ? { nombre: { $regex: new RegExp(nombre), $options: "i" } }
      : {};

    try {
      const datos = await empleado.find(condicion);
      return res.json(datos);
    } catch (error) {
      res.status(500).send({
        message: error.message || "[INFO] ERROR",
      });
    }
  }

  async editarEmpleado(req, res) {
    console.log(req.body);
    if (!req.body) {
      {
        return res.status(400).send({
          message: "[INFO] ERROR NO HAY DATOS",
        });
      }
    }

    const id = req.params.id;

    try {
      const datos = await empleado.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
      });
      if (!datos) {
        res.status(404).send({
          message: "[INFO] ERROR CLIENTE id =${id} NO SE ACTUALIZO",
        });
      } else {
        res.send({ message: "[INFO] ACTUALIZACION CORRECTA!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "[INFO] ERROR ACTUALIZACION",
      });
    }
  }

  async encontrarEmpleadoId(id) {
    try {
      const objetoEmpleado = await empleado.findOne({ _id: id }).exec();
      console.log("EMPLEADO: " + objetoEmpleado);
      if (objetoEmpleado === null) {
        console.log("noExisteEmpleado");
        return "noExisteEmpleado";
      } else {
        console.log("existe");
        return "existe";
      }
    } catch (error) {
      console.log("errorConexion");
      return "errorConexion";
    }
  }
}
module.exports = new empleadoControlador();

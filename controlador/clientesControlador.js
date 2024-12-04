const cliente = require("../validacion/clientes");
const empleadoController = require("./empleadosControlador");

class clienteControlador {
  async crearCliente(req, res) {
    const idEmpleado = req.body.idEmpleado;
    console.log("ID: " + idEmpleado);
    const respuestaBusqueda = await empleadoController.encontrarEmpleadoId(
      idEmpleado
    );
    console.log("[INFO] RESULTADO BUSQUEDA :" + respuestaBusqueda);
    if (!req.body) {
      {
        return res.status(400).send({
          message: "[INFO] ERROR NO HAY DATOS",
        });
      }
    }
    if (respuestaBusqueda === "existe") {
      try {
        const datos = await cliente.create(req.body);
        return res.json(datos);
      } catch (error) {
        res.status(500).send({
          message: error.message || "[INFO] ERROR ",
        });
      }
    } else {
      return res.send("[INFO] ERROR CLIENTE");
    }
  }

  async listaClientes(req, res) {
    const nombre = req.query.nombreCliente;
    var condicion = nombre
      ? { nombreCliente: { $regex: new RegExp(nombre), $options: "i" } }
      : {};

    try {
      const datos = await cliente.find(condicion);
      return res.json(datos);
    } catch (error) {
      res.status(500).send({
        message: error.message || "[INFO] ERROR EN LA BUSQUEDA",
      });
    }
  }

  async editarCliente(req, res) {
    if (!req.body) {
      {
        return res.status(400).send({
          message: "[INFO] ERROR NO HAY DATOS",
        });
      }
    }

    const id = req.params.id;

    try {
      const datos = await cliente.findByIdAndUpdate(id, req.body, {
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

  async borrarCliente(req, res) {
    const id = req.params.id;

    try {
      const datos = await cliente.findByIdAndDelete(id);
      if (!datos) {
        res.status(404).send({
          message: "[INFO] ERROR AL BORRAR",
        });
      } else {
        res.send({
          message: "[INFO] CLIENTE ELIMINADO ",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "[INFO] ERROR AL ELIMINAR!",
      });
    }
  }
}
module.exports = new clienteControlador();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./ruta");

const app = express();
const PORT = 8080;

require("dotenv").config(); //variables de entorno inicializadas

// Para procesar JSON sin complicaciones
app.use(bodyParser.json());

// MongoDB
mongoose
  .connect(process.env.URL_BD_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("[INFO] Conectado a MongoDB"))
  .catch((err) => console.error("[ERROR] Error al conectar con MongoDB:", err));

// Rutas
app.use("/api/users", userRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "[ERROR] Ruta no encontrada" });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`[INFO] Servidor corriendo en http://localhost:${PORT}`);
});

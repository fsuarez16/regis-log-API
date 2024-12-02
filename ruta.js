const express = require("express");
const rutasHttp = express.Router();
const User = require("./validacion/usuario");

// POST registro
rutasHttp.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Crear un nuevo usuario
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "[INFO] Usuario registrado exitosamente" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: " [ERROR] El usuario ya existe" });
    } else {
      res.status(500).json({ message: "[ERROR] Error en el servidor", error });
    }
  }
});

// POST login
rutasHttp.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: "[INFO] Autenticación satisfactoria" });
    } else {
      res.status(401).json({ message: "[ERROR] Error en la autenticación" });
    }
  } catch (error) {
    res.status(500).json({ message: "[ERROR] Error en el servidor", error });
  }
});

module.exports = rutasHttp;

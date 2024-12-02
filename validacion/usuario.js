const mongoose = require("mongoose");

// Esquema del usuario para hacer la validación
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Modelo del usuario en mongo db
const User = mongoose.model("usuarios", UserSchema);

module.exports = User;

const Role = require("../models/role");
const User = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await User.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo} ya está registrado en la BD`);
  }
};

const existeUserById = async (id) => {
  const existeUser = await User.findById({ _id: id });
  if (!existeUser) {
    throw new Error(`El Id: ${id} no existe`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  existeUserById,
};

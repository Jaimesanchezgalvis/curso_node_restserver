const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Users = require("../models/usuario");

const userGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Users.countDocuments(query),
    Users.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const userPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const user = new Users({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    msg: "post API",
    user,
  });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await Users.findByIdAndUpdate(id, resto);

  res.json(user);
};

const userDelete = async (req, res = response) => {
  const { id } = req.params;

  // Físicamente lo borramos
  const user = await Users.findByIdAndUpdate(id, { estado: false });

  res.json({
    msg: "delete API",
    user,
  });
};

const userPatch = (req, res = response) => {
  res.json({
    msg: "patch API",
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
  userPatch,
};

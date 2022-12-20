const { response } = require("express");

const userGet = (req, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const userPost = (req, res = response) => {
  const body = req.body;

  res.json({
    msg: "post API",
    body,
  });
};

const userPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put API",
    id,
  });
};

const userDelete = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: "delete API",
    body,
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

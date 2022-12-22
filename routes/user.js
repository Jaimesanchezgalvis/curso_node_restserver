const { Router } = require("express");
const { check } = require("express-validator");
const Role = require("../models/role");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require("../controllers/users");
const { validarCampos } = require("../middlewares/varidar-campos");
const {
  esRolValido,
  emailExiste,
  existeUserById,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", userGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUserById),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  userPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser màs de 6 letras").isLength({
      min: 6,
    }),
    // check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  userPost
);

router.delete("/:id", [
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(existeUserById),
  validarCampos,
], userDelete);

router.patch("/", userPatch);

module.exports = router;

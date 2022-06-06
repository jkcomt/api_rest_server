const { Router } = require("express");
const { check } = require('express-validator');
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios.controller");
const { validarCampos } = require("../middleware/validar-campos");
const { esRolValido, emailValido, existeUsuariobyID } = require("../helpers/db-validators");
const router = Router();

router.get("/", usuariosGet);

router.post("/",[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser más de 6 letras').isLength({ min : 6 }),
  check('correo', 'El correo no es válido').isEmail(),  
  check('correo').custom( emailValido ),
  check('rol').custom( esRolValido ),
  validarCampos
], usuariosPost);

router.put("/:id",[
  check('id', 'El id no es válido').isMongoId(),
  check('id').custom(existeUsuariobyID),
  check('rol').custom( esRolValido ),
  validarCampos
],usuariosPut);

router.delete("/:id",[
  check('id', 'El id no es válido').isMongoId(),
  check('id').custom(existeUsuariobyID),
  validarCampos
], usuariosDelete);

module.exports = router;

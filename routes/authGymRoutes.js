//Call 3rd Modules
const express = require("express");
const { check } = require("express-validator");
const { validarJWT } = require('../middlewares/validar-jwt')

//Call custom Middlewares
const { validacionDeCampos } = require("../middlewares/validaciondecampos");
const isDate = require("../helpers/isDate");
//Admin Gym Controller
const authController = require("../controller/authController");

//Create the admin router
const router = express.Router();

//Create routes

router.post("/crearusuario",authController.crearUsuario);
router.post('/loginusuario', [
  check("email", "El email es obligatorio").isEmail(),
  validacionDeCampos
], authController.loginUsuario)

router.get('/renew',validarJWT, authController.revalidarToken)
//Export File
module.exports = router;


//Export File
module.exports = router;

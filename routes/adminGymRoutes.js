//Call 3rd Modules
const express = require("express");
const { check } = require("express-validator");

//Call custom Middlewares
const { validacionDeCampos } = require("../middlewares/validaciondecampos");
const isDate = require("../helpers/isDate");
//Admin Gym Controller
const adminGymController = require("../controller/adminGymController");
const authController = require("../controller/authController");

//Create the admin router
const router = express.Router();

//Create routes
router.get("/", adminGymController.getClientes);
router.get("/planes", adminGymController.getPlanes);
router.post(
  "/regcliente",

  //Form Validation
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("tipoDocumento", "Por favor selecciona un tipo de documento")
      .not()
      .isEmpty(),
    check("direccion", "La direccion es obligatoria").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("plan", "Por favor seleccione un plan").not().isEmpty(),
    check("fechaInicio", "Fecha de Inicio es Obligatoria").custom(isDate),
    check("fechaFinal", "Fecha Final es Obligatoria").custom(isDate),
    // check('password', 'El password debe ser de 8 caracteres').isLength({min: 8})

    //Middleware Validation
    validacionDeCampos,
  ],
  adminGymController.postCliente
);
router.get("/actcliente/:id", adminGymController.getCliente);
router.put("/actcliente/:id", adminGymController.actualizarCliente);
router.delete("/clientes/:id", adminGymController.eliminarCliente);

router.post("/regplan", adminGymController.postPlan);

//Export File
module.exports = router;

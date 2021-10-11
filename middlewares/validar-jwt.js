const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Debes Iniciar Sesion",
    });
  }

  try {
    const {nombre, uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid
    req.nombre = nombre 

    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "token no valido",
    });
  }

  console.log(token);

  next();
};

module.exports = {
  validarJWT,
};

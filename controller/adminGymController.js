const { response } = require("express");
const Cliente = require("../models/cliente");
const Plan = require("../models/plan");
const Usuario = require("../models/usuario");

// Routes
exports.getClientes = (req, res = response) => {
  //Fetch all customers
  Cliente.find()
    .populate("plan", "plan")
    .exec((err, clientes) => {
      if (err) throw err;
      res.json(clientes);
    });
};

exports.getPlanes = (req, res = response) => {
  //Fetch all customers
  Plan.find().exec(function (err, data) {
    res.json(data);
  });
};

exports.postPlan = async (req, res = response) => {
  try {
    const plan = await Plan.findOne({ plan: req.body.plan }, (err) => {
      if (err) throw err;
    });
    if (plan) {
      res.json({ status: "El plan ya existe" });
    } else {
      const agregarPlan = await new Plan({
        plan: req.body.plan,
      });

      const resultPlan = await agregarPlan.save();
      res.status(201).json({ data: resultPlan });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postCliente = async (req, res = response) => {
  try {
    const cliente = await Cliente.findOne(
      { numeroDoc: req.body.numeroDoc },
      (err) => {
        if (err) throw err;
      }
    );
    if (cliente) {
      res.json({ status: "El cliente ya existe" });
    } else {
      const agregarCliente = await new Cliente({
        nombre: req.body.nombre,
        tipoDocumento: req.body.tipoDocumento,
        numeroDoc: req.body.numeroDoc,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        plan: req.body.plan,
        fechaInicio: req.body.fechaInicio,
        fechaFinal: req.body.fechaFinal,
      });

      const resultCliente = await agregarCliente.save();

      const plan = await Plan.findById({ _id: agregarCliente.plan });
      plan.usuarios.push(agregarCliente);
      await plan.save();

      res.status(201).json({ data: resultCliente });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getCliente = (req, res = response) => {
  const clienteId = req.params.id;
  console.log(clienteId);

  try {
    Cliente.findById(clienteId)
      .populate("plan", "plan")
      .exec((err, clientes) => {
        if (err) throw err;
        res.json(clientes);
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.actualizarCliente = async (req, res = response) => {
  const clienteId = req.params.id;

  try {
    const cliente = await Cliente.findOneAndUpdate(clienteId);

    if (!cliente) {
      return res.status(404).json({ message: "El cliente no existe" });
    }

    const nuevoCliente = {
      ...req.body,
    };

    const actualizaCliente = await Cliente.findByIdAndUpdate(
      clienteId,
      nuevoCliente
    );

    res.json(actualizaCliente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.eliminarCliente = async (req, res = response) => {
  const clienteid = req.params.id;

  try {
    const cliente = await Cliente.findOneAndDelete({ _id: clienteid });

    if (!cliente) {
      return res.status(404).json({ message: "El cliente no existe" });
    }

    console.log(cliente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


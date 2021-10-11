// //Mongoose module
const moment = require("moment");
const mongoose = require("mongoose");


// //Create Mongoose Schema
const Schema = mongoose.Schema;
const ClienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    tipoDocumento: {
      type: String,
      required: true,
    },
    numeroDoc: {
      type: Number,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    telefono: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required:true
    },
    status: {
      type: Boolean,
      default: true
    },
    fechaInicio: {
      type: Date,
      required:true
    },
    fechaFinal: {
      type: Date,
      required:true
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Cliente", ClienteSchema);

// //Mongoose module
const mongoose = require("mongoose");

// //Create Mongoose Schema
const Schema = mongoose.Schema;
const PlanesSchema = new Schema(
  {
    plan: String,
    usuarios: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cliente",
      },
    ],
    parentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", PlanesSchema);

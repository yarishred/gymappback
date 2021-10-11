const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    // rol: {
    //   type: String,
    //   tipoUsuario: ["usuario", "admin"],
    //   default: "usuario",
    // },
    // clientesIngresados: {
    //   cliente: [
    //     {
    //       clienteId: {
    //         type: Schema.Types.ObjectId,
    //         ref: "Cliente",
    //         required: true,
    //       },
    //     },
    //   ],
    // },
  },
  {
    timestamps: true,
  }
);

// //Encriptar el password
// UsuarioSchema.virtual("password").set(function (password) {
//   this.encryptedPassword = bcrypt.hashSync(password, 10);
// });

// //Autenticar Password
// UsuarioSchema.methods = {
//   authenticate: function (password) {
//     return bcrypt.compareSync(password, this.encryptedPassword);
//   },
// };

module.exports = mongoose.model("Usuario", UsuarioSchema);

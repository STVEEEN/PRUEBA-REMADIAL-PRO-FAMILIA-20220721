import { Schema, model } from "mongoose";

const pacienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true, 
    },

    edad: {
      type: Number,
      required: true, 
      min: 0, 
    },

    correo: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], 
    },

    contraseña: {
      type: String,
      required: true,
    },

    telefono: {
      type: String,
      required: true, 
      match: [/^\d{8,15}$/, 'El número de teléfono debe tener entre 8 y 15 dígitos'], 
    },

    isVerified: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true, 
    strict: false, 
  }
);

export default model("paciente", pacienteSchema);

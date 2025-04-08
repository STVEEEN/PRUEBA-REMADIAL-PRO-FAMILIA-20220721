import { Schema, model } from "mongoose";

const doctorSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true, 
    },

    especialidad: {
      type: String,
      required: true,
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
    }
  },
  {
    timestamps: true, 
    strict: false, 
  }
);

export default model("doctor", doctorSchema);

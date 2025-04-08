import { Schema, model } from "mongoose";

const citaSchema = new Schema(
  {
    fecha: {
      type: Date,
      required: true, 
    },

    hora: {
      type: String,
      required: true, 
      match: [/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, 'Por favor ingrese una hora válida (HH:mm)'], 
    },

    motivo: {
      type: String,
      required: true, 
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "doctor", 
      required: true, 
    },

    pacientId: {
      type: Schema.Types.ObjectId,
      ref: "paciente", 
      required: true, 
    },
  },
  {
    timestamps: true, 
    strict: false, 
  }
);

export default model("cita", citaSchema);

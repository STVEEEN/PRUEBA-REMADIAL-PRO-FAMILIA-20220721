import express from "express";
import registerPacienteController from "../controllers/registerPacientController.js";

const router = express.Router();

// Ruta para registrar un nuevo paciente
router.route("/").post(registerPacienteController.register);

// Ruta para verificar el código de verificación de correo del paciente
router.route("/api/verifyCodeEmail").post(registerPacienteController.verifyCodeEmail);

export default router;

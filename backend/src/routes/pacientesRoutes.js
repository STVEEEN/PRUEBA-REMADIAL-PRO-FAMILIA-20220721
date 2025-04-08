import express from "express";
import pacienteController from "../controllers/pacienteController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(pacienteController.getPacientes)

router
  .route("/:id")
  .put(pacienteController.updatePaciente)
  .delete(pacienteController.deletePaciente);

export default router;

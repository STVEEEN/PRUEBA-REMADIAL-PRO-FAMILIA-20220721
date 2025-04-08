import express from "express";
import citaController from "../controllers/citasController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(citaController.getCitas)
  .post(citaController.createCita);

router
  .route("/:id")
  .put(citaController.updateCita)
  .delete(citaController.deleteCita);

export default router;

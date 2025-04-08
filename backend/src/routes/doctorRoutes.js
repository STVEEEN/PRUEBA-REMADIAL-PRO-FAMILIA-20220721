import express from "express";
import doctorController from "../controllers/doctorController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(doctorController.getDoctors)

router
  .route("/:id")
  .put(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);

export default router;

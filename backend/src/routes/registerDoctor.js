import express from "express";
import doctorController from "../controllers/registerDoctorController.js";
const router = express.Router();

router
  .route("/")
  .post(doctorController.register);

export default router;
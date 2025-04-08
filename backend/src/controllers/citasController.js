const citaController = {};
import citaModel from "../models/Citas.js";

// SELECT 
citaController.getCitas = async (req, res) => {
  try {
    const citas = await citaModel.find().populate('doctorId pacientId');
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las citas", error });
  }
};

// INSERT 
citaController.createCita = async (req, res) => {
  try {
    const { fecha, hora, motivo, doctorId, pacientId } = req.body;
    const newCita = new citaModel({ fecha, hora, motivo, doctorId, pacientId });
    await newCita.save();
    res.json({ message: "Cita creada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la cita", error });
  }
};

// DELETE 
citaController.deleteCita = async (req, res) => {
  try {
    const deletedCita = await citaModel.findByIdAndDelete(req.params.id);
    if (!deletedCita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }
    res.json({ message: "Cita eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la cita", error });
  }
};

// UPDATE 
citaController.updateCita = async (req, res) => {
  try {
    const { fecha, hora, motivo, doctorId, pacientId } = req.body;
    const updatedCita = await citaModel.findByIdAndUpdate(
      req.params.id,
      {
        fecha,
        hora,
        motivo,
        doctorId,
        pacientId,
      },
      { new: true } 
    );
    if (!updatedCita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }
    res.json({ message: "Cita actualizada exitosamente", updatedCita });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la cita", error });
  }
};

export default citaController;

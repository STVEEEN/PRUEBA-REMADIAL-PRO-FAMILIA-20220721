const pacienteController = {};
import pacienteModel from "../models/Pacientes.js";

// SELECT 
pacienteController.getPacientes = async (req, res) => {
  try {
    const pacientes = await pacienteModel.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pacientes", error });
  }
};

// DELETE 
pacienteController.deletePaciente = async (req, res) => {
  try {
    const deletedPaciente = await pacienteModel.findByIdAndDelete(req.params.id);
    if (!deletedPaciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el paciente", error });
  }
};

// UPDATE 
pacienteController.updatePaciente = async (req, res) => {
  try {
    const { nombre, edad, correo, contraseña, telefono, isVerified } = req.body;
    const updatedPaciente = await pacienteModel.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        edad,
        correo,
        contraseña,
        telefono,
        isVerified,
      },
      { new: true } 
    );
    if (!updatedPaciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.json({ message: "Paciente actualizado exitosamente", updatedPaciente });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el paciente", error });
  }
};

export default pacienteController;

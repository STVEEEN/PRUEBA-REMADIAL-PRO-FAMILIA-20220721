const doctorController = {};
import doctorModel from "../models/Doctores.js";

// SELECT 
doctorController.getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los doctores", error });
  }
};

// DELETE 
doctorController.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await doctorModel.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor no encontrado" });
    }
    res.json({ message: "Doctor eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el doctor", error });
  }
};

// UPDATE 
doctorController.updateDoctor = async (req, res) => {
  try {
    const { nombre, especialidad, correo, contraseña } = req.body;
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        especialidad,
        correo,
        contraseña,
      },
      { new: true } 
    );
    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor no encontrado" });
    }
    res.json({ message: "Doctor actualizado exitosamente", updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el doctor", error });
  }
};

export default doctorController;
